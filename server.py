#!/usr/bin/env python3
"""Статика сайта + API админки: правки пишутся в data/cms.json."""
import json
import os
import ssl
import sys
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlencode, urlparse

ROOT = Path(os.environ.get("RP_ROOT", "/app")).resolve()
DATA = Path(os.environ.get("RP_DATA", str(ROOT / "data"))).resolve()
CMS_FILE = DATA / "cms.json"
APPS_FILE = DATA / "apps.json"
PORT = int(os.environ.get("RP_PORT", "80"))
DEFAULT_PIN = os.environ.get("RP_ADMIN_PIN", "palitra")
MAX_BODY = 4 * 1024 * 1024
MAX_API = os.environ.get("MAX_API_BASE", "https://platform-api2.max.ru").rstrip("/")
MAX_BOT_TOKEN = os.environ.get("MAX_BOT_TOKEN", "")
MAX_ADMIN_CHAT_IDS = [
    x.strip() for x in os.environ.get("MAX_ADMIN_CHAT_IDS", "").split(",") if x.strip()
]
MAX_CA_FILE = os.environ.get("MAX_CA_FILE", "")


def ensure_data():
    DATA.mkdir(parents=True, exist_ok=True)


def read_json(path, fallback):
    try:
        if path.is_file():
            return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        pass
    return fallback


def write_json(path, payload):
    ensure_data()
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(path)


def stored_pin():
    saved = read_json(CMS_FILE, {})
    cfg = saved.get("config") or {}
    admin = cfg.get("admin") or {}
    pin = admin.get("pin")
    return str(pin) if pin else DEFAULT_PIN


def ssl_context():
    if MAX_CA_FILE and Path(MAX_CA_FILE).is_file():
        ctx = ssl.create_default_context()
        ctx.load_verify_locations(MAX_CA_FILE)
        return ctx
    return ssl.create_default_context()


def package_label(slug):
    saved = read_json(CMS_FILE, {})
    packages = ((saved.get("data") or {}).get("packages")) or []
    for pack in packages:
        if pack.get("slug") == slug:
            title = pack.get("title") or slug
            price = pack.get("priceLabel") or ""
            return ("%s — %s" % (title, price)).strip(" —")
    return slug or "не указан"


def format_app_message(entry):
    ads = "да" if entry.get("ads") else "нет"
    lines = [
        "Заявка партнёра с сайта",
        "",
        "Имя: %s" % (entry.get("name") or "—"),
        "Компания: %s" % (entry.get("company") or "—"),
        "Должность: %s" % (entry.get("role") or "—"),
        "Телефон: %s" % (entry.get("phone") or "—"),
        "Email: %s" % (entry.get("email") or "—"),
        "Пакет: %s" % package_label(entry.get("package")),
        "Рассылка: %s" % ads,
    ]
    comment = (entry.get("comment") or "").strip()
    if comment:
        lines.extend(["", "Комментарий:", comment])
    created = entry.get("createdAt") or ""
    if created:
        lines.extend(["", "Время: %s" % created])
    return "\n".join(lines)


def notify_max_admins(entry):
    if not MAX_BOT_TOKEN or not MAX_ADMIN_CHAT_IDS:
        sys.stderr.write("[max] skip notify: token or chat id is empty\n")
        return
    text = format_app_message(entry)
    body = json.dumps({"text": text}, ensure_ascii=False).encode("utf-8")
    ctx = ssl_context()
    for chat_id in MAX_ADMIN_CHAT_IDS:
        query = urlencode({"chat_id": chat_id})
        req = urllib.request.Request(
            MAX_API + "/messages?" + query,
            data=body,
            method="POST",
            headers={
                "Authorization": MAX_BOT_TOKEN,
                "Content-Type": "application/json; charset=utf-8",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=8, context=ctx) as res:
                sys.stderr.write("[max] sent to %s status=%s\n" % (chat_id, res.status))
        except urllib.error.HTTPError as err:
            detail = err.read().decode("utf-8", "ignore")[:400]
            sys.stderr.write("[max] chat %s HTTP %s %s\n" % (chat_id, err.code, detail))
        except Exception as err:
            sys.stderr.write("[max] chat %s failed: %s\n" % (chat_id, err))


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        path = urlparse(self.path).path
        if path.startswith("/api/") or path.endswith(".html") or path.endswith(".js"):
            self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))

    def _route(self):
        return urlparse(self.path).path.rstrip("/") or "/"

    def _send(self, code, body, content_type="application/json; charset=utf-8"):
        if isinstance(body, (dict, list)):
            raw = json.dumps(body, ensure_ascii=False).encode("utf-8")
        elif isinstance(body, str):
            raw = body.encode("utf-8")
        else:
            raw = body or b""
        self.send_response(code)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(raw)

    def _read_body(self):
        length = int(self.headers.get("Content-Length") or 0)
        if length > MAX_BODY:
            return None
        return self.rfile.read(length) if length else b""

    def do_GET(self):
        route = self._route()
        if route == "/api/cms":
            if not CMS_FILE.is_file():
                self._send(404, {"error": "empty"})
                return
            self._send(200, read_json(CMS_FILE, {}))
            return
        if route == "/api/apps":
            self._send(200, read_json(APPS_FILE, []))
            return
        if route == "/api/health":
            self._send(200, {"ok": True, "max": bool(MAX_BOT_TOKEN and MAX_ADMIN_CHAT_IDS)})
            return
        return SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        route = self._route()
        raw = self._read_body()
        if raw is None:
            self._send(413, {"error": "too large"})
            return
        try:
            payload = json.loads(raw.decode("utf-8") or "{}")
        except Exception:
            self._send(400, {"error": "bad json"})
            return

        pin = str(payload.get("pin") or self.headers.get("X-Admin-Pin") or "")
        if route == "/api/apps":
            apps = read_json(APPS_FILE, [])
            entry = payload.get("entry")
            if entry:
                apps.insert(0, entry)
                write_json(APPS_FILE, apps)
                notify_max_admins(entry)
            self._send(200, {"ok": True, "count": len(apps)})
            return

        if pin != stored_pin() and pin != DEFAULT_PIN:
            self._send(403, {"error": "bad pin"})
            return

        if route == "/api/cms":
            saved = {
                "config": payload.get("config"),
                "data": payload.get("data"),
            }
            if not saved["config"] or not saved["data"]:
                self._send(400, {"error": "need config and data"})
                return
            write_json(CMS_FILE, saved)
            self._send(200, {"ok": True})
            return

        if route == "/api/cms/reset":
            if CMS_FILE.exists():
                CMS_FILE.unlink()
            self._send(200, {"ok": True})
            return

        if route == "/api/apps/clear":
            write_json(APPS_FILE, [])
            self._send(200, {"ok": True})
            return

        self._send(404, {"error": "not found"})


if __name__ == "__main__":
    ensure_data()
    os.chdir(str(ROOT))
    httpd = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(
        "palitra site on 0.0.0.0:%s root=%s data=%s max_chats=%s"
        % (PORT, ROOT, DATA, len(MAX_ADMIN_CHAT_IDS)),
        flush=True,
    )
    httpd.serve_forever()

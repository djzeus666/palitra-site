#!/usr/bin/env python3
import json
import urllib.request

urllib.request.urlopen("http://127.0.0.1:8088/api/cms").read()
# force nothing — just verify file
from pathlib import Path
d = json.loads(Path("/opt/palitra-site/data/cms.json").read_text(encoding="utf-8"))
for c in d["data"]["categories"]:
    if c["slug"] == "dlya-vseh":
        print("category:", c["title"])
for item in d["data"]["faq"]:
    if "Творческое" in item.get("a", "") or "красоты" in item.get("a", ""):
        print("faq:", item["a"][:80])

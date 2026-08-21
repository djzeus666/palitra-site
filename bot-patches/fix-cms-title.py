#!/usr/bin/env python3
import json
from pathlib import Path

path = Path("/opt/palitra-site/data/cms.json")
data = json.loads(path.read_text(encoding="utf-8"))

changed = []

cats = (data.get("data") or {}).get("categories") or []
for c in cats:
    if c.get("slug") == "dlya-vseh" and c.get("title") == "Для всех":
        c["title"] = "Творческое"
        changed.append("category title")

faq = (data.get("data") or {}).get("faq") or []
for item in faq:
    a = item.get("a") or ""
    if "Для всех" in a:
        item["a"] = a.replace("«Для всех»", "«Творческое»").replace("Для всех", "Творческое")
        changed.append("faq")

copy = (data.get("config") or {}).get("copy") or {}
for key, val in list(copy.items()):
    if isinstance(val, str) and "Для всех" in val:
        # keep section titles that say "Конкурс для всех" unless exact category
        pass

path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print("changed:", changed or "nothing")

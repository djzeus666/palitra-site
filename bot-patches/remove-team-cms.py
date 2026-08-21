#!/usr/bin/env python3
import json
from pathlib import Path

p = Path("/opt/palitra-site/data/cms.json")
d = json.loads(p.read_text(encoding="utf-8"))
data = d.setdefault("data", {})

cats = data.get("categories") or []
data["categories"] = [c for c in cats if c.get("slug") != "komandnoe"]
for c in data["categories"]:
    if c.get("slug") == "dlya-vseh":
        c["index"] = "06"

noms = data.get("nominations") or []
data["nominations"] = [
    n for n in noms
    if n.get("category") != "komandnoe" and n.get("slug") != "komandnyj-vyhod"
]

# recount
counts = {}
for n in data["nominations"]:
    slug = n.get("category")
    counts[slug] = counts.get(slug, 0) + 1
for c in data["categories"]:
    if c.get("slug") in counts:
        c["count"] = counts[c["slug"]]

p.write_text(json.dumps(d, ensure_ascii=False, indent=2), encoding="utf-8")
print("categories:", [(c["index"], c["slug"], c["title"]) for c in data["categories"]])
print("noms left:", len(data["nominations"]))

#!/usr/bin/env python3
import json
from pathlib import Path

p = Path("/opt/palitra-site/data/cms.json")
d = json.loads(p.read_text(encoding="utf-8"))
teaser = "Участвует любой человек вне бьюти и fashion — просто любой желающий"
lead = (
    "Участвует любой человек вне бьюти и fashion — просто любой желающий. "
    "Текст, рисунок, фото, видео — отдельная ветка с тем же стартовым взносом 500 ₽."
)
for c in d.get("data", {}).get("categories", []):
    if c.get("slug") == "dlya-vseh":
        c["teaser"] = teaser
        print("category teaser ok")
copy = d.setdefault("config", {}).setdefault("copy", {})
copy["allLead"] = lead
print("allLead ok")
p.write_text(json.dumps(d, ensure_ascii=False, indent=2), encoding="utf-8")

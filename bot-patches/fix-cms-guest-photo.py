#!/usr/bin/env python3
import json
from pathlib import Path

p = Path("/opt/palitra-site/data/cms.json")
d = json.loads(p.read_text(encoding="utf-8"))
for g in d.get("data", {}).get("guests", []):
    if g.get("slug") == "tasha-rubleva":
        g["photo"] = "img/tasha-rubleva.png"
        print("photo set")
p.write_text(json.dumps(d, ensure_ascii=False, indent=2), encoding="utf-8")

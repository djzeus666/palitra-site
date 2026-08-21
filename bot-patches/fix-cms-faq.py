#!/usr/bin/env python3
import json
from pathlib import Path

p = Path("/opt/palitra-site/data/cms.json")
d = json.loads(p.read_text(encoding="utf-8"))
for item in d.get("data", {}).get("faq", []):
    a = item.get("a") or ""
    if "Творческое" in a or "Для всех" in a:
        if "красоты" in a or "рисунка" in a:
            item["a"] = "Нет. Для направления «Творческое» достаточно текста, рисунка, фото или видео."
p.write_text(json.dumps(d, ensure_ascii=False, indent=2), encoding="utf-8")
print("faq fixed")

#!/usr/bin/env python3
import json
from pathlib import Path

p = Path("/opt/palitra-site/data/cms.json")
d = json.loads(p.read_text(encoding="utf-8"))

guest = {
    "slug": "tasha-rubleva",
    "name": "Таша Рублева",
    "role": "Звёздный гость",
    "title": "Владелица и CEO сети Модного Дома Rubleffka в Москве и Екатеринбурге",
    "initials": "ТР",
    "photo": "",
    "points": [
        "С 2011 года одевает политиков и бизнесменов России",
        "Амбассадор социального проекта «Предпринимательские классы»",
        "Финалистка проекта «Декларация» Михаила Гребенюка",
        "Лауреат Премии имени Столыпина «Лучший предприниматель Свердловской области»",
        "Член «Деловой России» Московской области",
        "Наставник предпринимателей",
    ],
}

data = d.setdefault("data", {})
guests = data.get("guests")
if not isinstance(guests, list):
    data["guests"] = [guest]
elif not any(g.get("slug") == "tasha-rubleva" for g in guests):
    guests.insert(0, guest)
else:
    for i, g in enumerate(guests):
        if g.get("slug") == "tasha-rubleva":
            guests[i] = guest
            break

copy = d.setdefault("config", {}).setdefault("copy", {})
copy["juryTitle"] = "Звёздные гости"
copy["juryLead"] = "Люди сцены «Русской Палитры». Состав дополняется по мере подтверждения."

p.write_text(json.dumps(d, ensure_ascii=False, indent=2), encoding="utf-8")
print("guest ok:", data["guests"][0]["name"])
print("juryTitle:", copy["juryTitle"])

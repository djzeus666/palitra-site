#!/bin/sh
set -e
APP=/app
# competition.js — full replace
cp /tmp/bot-patches/competition.js "$APP/dist/services/competition.js"

# config.js — add creativeNominationPrice if missing
python3 << 'PY'
from pathlib import Path
p = Path("/app/dist/config.js")
text = p.read_text(encoding="utf-8")
needle = "nominationPrice3Plus: Number(optional('NOMINATION_PRICE_3PLUS', '2500')),"
insert = needle + "\n    creativeNominationPrice: Number(optional('CREATIVE_NOMINATION_PRICE', '500')),"
if "creativeNominationPrice" not in text:
    text = text.replace(needle, insert)
    p.write_text(text, encoding="utf-8")
PY

# catalog.js — replace pricing block
python3 << 'PY'
from pathlib import Path
p = Path("/app/dist/bot/catalog.js")
text = p.read_text(encoding="utf-8")
start = text.index("/** Price per nomination depending on count */")
end = len(text)
new_block = Path("/tmp/bot-patches/catalog-pricing.js").read_text(encoding="utf-8")
# catalog-pricing needs config import - already in catalog.js
# catalog-pricing uses parseSelectionKey - already defined above in catalog.js
text = text[:start] + new_block
p.write_text(text, encoding="utf-8")
PY

# keyboards.js — stage2CartText
python3 << 'PY'
from pathlib import Path
p = Path("/app/dist/bot/keyboards.js")
text = p.read_text(encoding="utf-8")
old = """export function stage2CartText(selectedCount, labels = []) {
    if (selectedCount === 0) {
        return '🛒 **Корзина пуста**';
    }
    const list = labels.length ? `${labels.map((item) => `• ${item}`).join('\\n')}\\n\\n` : '';
    return `🛒 **Корзина:**\\n${list}${formatNominationsBreakdown(selectedCount)}`;
}"""
new = """export function stage2CartText(selectedKeys = [], labels = []) {
    const keys = Array.isArray(selectedKeys) ? selectedKeys : [];
    if (keys.length === 0) {
        return '🛒 **Корзина пуста**';
    }
    const list = labels.length ? `${labels.map((item) => `• ${item}`).join('\\n')}\\n\\n` : '';
    return `🛒 **Корзина:**\\n${list}${formatNominationsBreakdown(keys)}`;
}"""
if old not in text:
    raise SystemExit('keyboards stage2CartText block not found')
text = text.replace(old, new)
p.write_text(text, encoding="utf-8")
PY

# index.js — pass keys arrays to pricing helpers
python3 << 'PY'
from pathlib import Path
p = Path("/app/dist/bot/index.js")
text = p.read_text(encoding="utf-8")
text = text.replace('calculateNominationsTotal(keys.length)', 'calculateNominationsTotal(keys)')
text = text.replace('formatNominationsBreakdown(keys.length)', 'formatNominationsBreakdown(keys)')
text = text.replace('stage2CartText(0)', 'stage2CartText([])')
text = text.replace('stage2CartText(keys.length, labels)', 'stage2CartText(keys, labels)')
text = text.replace('stage2CartText(next.length, labels)', 'stage2CartText(next, labels)')
text = text.replace('stage2CartText(keys.length, session.nominationLabels ?? labelsFromKeys(\'\', keys))', 'stage2CartText(keys, session.nominationLabels ?? labelsFromKeys(\'\', keys))')
p.write_text(text, encoding="utf-8")
PY

echo "Bot pricing patch applied."

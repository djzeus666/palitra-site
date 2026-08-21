import fs from 'fs';

const competition = fs.readFileSync('/tmp/bot-patches/competition.js', 'utf8');
fs.writeFileSync('/app/dist/services/competition.js', competition);

const configPath = '/app/dist/config.js';
let configText = fs.readFileSync(configPath, 'utf8');
const needle = "nominationPrice3Plus: Number(optional('NOMINATION_PRICE_3PLUS', '2500')),";
const insert = needle + "\n    creativeNominationPrice: Number(optional('CREATIVE_NOMINATION_PRICE', '500')),";
if (!configText.includes('creativeNominationPrice')) {
  configText = configText.replace(needle, insert);
  fs.writeFileSync(configPath, configText);
}

const catalogPath = '/app/dist/bot/catalog.js';
let catalogText = fs.readFileSync(catalogPath, 'utf8');
const markers = [
  '/** Price per nomination depending on count */',
  '/** Price per professional nomination depending on count (excluding creative). */',
];
let start = -1;
for (const marker of markers) {
  start = catalogText.indexOf(marker);
  if (start >= 0) break;
}
if (start < 0) {
  start = catalogText.indexOf('export function nominationUnitPrice(count)');
}
if (start < 0) throw new Error('catalog pricing block not found');

const newTail = `/** Price per professional nomination depending on count (excluding creative). */
export function proNominationUnitPrice(count) {
    if (count <= 1)
        return config.nominationPrice1;
    if (count === 2)
        return config.nominationPrice2;
    return config.nominationPrice3Plus;
}
export function creativeNominationUnitPrice() {
    return config.creativeNominationPrice;
}
/** @deprecated use proNominationUnitPrice */
export function nominationUnitPrice(count) {
    return proNominationUnitPrice(count);
}
export function isCreativeSelectionKey(key) {
    const { specialtyId } = parseSelectionKey(key);
    return specialtyId === 'creative';
}
export function calculatePaymentTotal(keys, entryFee = config.entryFeeAmount) {
    const list = Array.isArray(keys) ? keys : [];
    const proKeys = list.filter((key) => !isCreativeSelectionKey(key));
    const creativeKeys = list.filter((key) => isCreativeSelectionKey(key));
    const proUnit = proKeys.length === 0 ? 0 : proNominationUnitPrice(proKeys.length);
    const creativeUnit = creativeNominationUnitPrice();
    const proTotal = proUnit * proKeys.length;
    const creativeTotal = creativeUnit * creativeKeys.length;
    const nominationsTotal = proTotal + creativeTotal;
    const total = entryFee + nominationsTotal;
    return {
        entryFee,
        nominationCount: list.length,
        proCount: proKeys.length,
        creativeCount: creativeKeys.length,
        proUnit,
        creativeUnit,
        nominationsTotal,
        total,
        totalFixed: total.toFixed(2),
    };
}
export function formatPaymentBreakdown(keys, entryFee = config.entryFeeAmount) {
    const calc = calculatePaymentTotal(keys, entryFee);
    if (calc.nominationCount === 0) {
        return \`Организационный взнос: **\${calc.entryFee} ₽**\`;
    }
    const lines = [\`Организационный взнос: **\${calc.entryFee} ₽**\`];
    if (calc.proCount > 0) {
        lines.push(\`Проф. номинации: **\${calc.proCount}** × **\${calc.proUnit.toLocaleString('ru-RU')} ₽** = **\${(calc.proUnit * calc.proCount).toLocaleString('ru-RU')} ₽**\`);
    }
    if (calc.creativeCount > 0) {
        lines.push(\`Творческий конкурс: **\${calc.creativeCount}** × **\${calc.creativeUnit.toLocaleString('ru-RU')} ₽** = **\${(calc.creativeUnit * calc.creativeCount).toLocaleString('ru-RU')} ₽**\`);
    }
    lines.push(\`Итого к оплате: **\${calc.total.toLocaleString('ru-RU')} ₽**\`);
    return lines.join('\\n');
}
`;
catalogText = catalogText.slice(0, start) + newTail;
fs.writeFileSync(catalogPath, catalogText);

const kbPath = '/app/dist/bot/keyboards.js';
let kbText = fs.readFileSync(kbPath, 'utf8');
if (kbText.includes('formatNominationsBreakdown(selectedCount)')) {
  const oldCart = `export function stage2CartText(selectedCount, labels = []) {
    if (selectedCount === 0) {
        return '🛒 **Корзина пуста**';
    }
    const list = labels.length ? \`\${labels.map((item) => \`• \${item}\`).join('\\n')}\\n\\n\` : '';
    return \`🛒 **Корзина:**\\n\${list}\${formatNominationsBreakdown(selectedCount)}\`;
}`;
  const newCart = `export function stage2CartText(selectedKeys = [], labels = []) {
    const keys = Array.isArray(selectedKeys) ? selectedKeys : [];
    if (keys.length === 0) {
        return '🛒 **Корзина пуста**';
    }
    const list = labels.length ? \`\${labels.map((item) => \`• \${item}\`).join('\\n')}\\n\\n\` : '';
    return \`🛒 **Корзина:**\\n\${list}\${formatNominationsBreakdown(keys)}\`;
}`;
  kbText = kbText.replace(oldCart, newCart);
  fs.writeFileSync(kbPath, kbText);
}

const indexPath = '/app/dist/bot/index.js';
let indexText = fs.readFileSync(indexPath, 'utf8');
indexText = indexText.replaceAll('calculateNominationsTotal(keys.length)', 'calculateNominationsTotal(keys)');
indexText = indexText.replaceAll('formatNominationsBreakdown(keys.length)', 'formatNominationsBreakdown(keys)');
indexText = indexText.replaceAll('stage2CartText(0)', 'stage2CartText([])');
indexText = indexText.replaceAll('stage2CartText(keys.length, labels)', 'stage2CartText(keys, labels)');
indexText = indexText.replaceAll('stage2CartText(next.length, labels)', 'stage2CartText(next, labels)');
indexText = indexText.replaceAll(
  "stage2CartText(keys.length, session.nominationLabels ?? labelsFromKeys('', keys))",
  "stage2CartText(keys, session.nominationLabels ?? labelsFromKeys('', keys))"
);
fs.writeFileSync(indexPath, indexText);

console.log('Bot pricing patch applied.');

import fs from 'fs';

const catalogPath = '/app/dist/bot/catalog.js';
let text = fs.readFileSync(catalogPath, 'utf8');
const marker = '/** Price per professional nomination depending on count (excluding creative). */';
const start = text.indexOf(marker);
if (start < 0) throw new Error('catalog marker not found');

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
    return isCreativeNominationKey(key);
}
export function calculatePaymentTotal(keys, entryFee = config.entryFeeAmount) {
    const list = Array.isArray(keys) ? keys : [];
    const proKeys = list.filter((key) => !isCreativeNominationKey(key));
    const creativeKeys = list.filter((key) => isCreativeNominationKey(key));
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

text = text.slice(0, start) + newTail;
fs.writeFileSync(catalogPath, text);
console.log('catalog.js pricing tail replaced.');

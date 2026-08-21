import { config } from '../config.js';
import {
    creativeNominationUnitPrice,
    isCreativeSelectionKey,
    proNominationUnitPrice,
} from '../bot/catalog.js';
/** Stage 2: nominations only, no org fee */
export function calculateNominationsTotal(keys) {
    const list = Array.isArray(keys) ? keys : [];
    const creativeKeys = list.filter((key) => isCreativeSelectionKey(key));
    const proKeys = list.filter((key) => !isCreativeSelectionKey(key));
    const creativeUnit = creativeNominationUnitPrice();
    const proUnit = proKeys.length === 0 ? 0 : proNominationUnitPrice(proKeys.length);
    const creativeTotal = creativeKeys.length * creativeUnit;
    const proTotal = proUnit * proKeys.length;
    const total = creativeTotal + proTotal;
    return {
        nominationCount: list.length,
        creativeCount: creativeKeys.length,
        proCount: proKeys.length,
        creativeUnit,
        proUnit,
        creativeTotal,
        proTotal,
        total,
        totalFixed: total.toFixed(2),
    };
}
export function formatNominationsBreakdown(keys) {
    const calc = calculateNominationsTotal(keys);
    if (calc.nominationCount === 0) {
        return 'Выберите хотя бы одну номинацию.';
    }
    const lines = [];
    if (calc.proCount > 0) {
        lines.push(`Проф. номинации: **${calc.proCount}** × **${calc.proUnit.toLocaleString('ru-RU')} ₽** = **${calc.proTotal.toLocaleString('ru-RU')} ₽**`);
    }
    if (calc.creativeCount > 0) {
        lines.push(`Творческий конкурс: **${calc.creativeCount}** × **${calc.creativeUnit.toLocaleString('ru-RU')} ₽** = **${calc.creativeTotal.toLocaleString('ru-RU')} ₽**`);
    }
    lines.push(`Итого к оплате: **${calc.total.toLocaleString('ru-RU')} ₽**`);
    return lines.join('\n');
}
export function calculateWorksDeadline(paidAt) {
    const daysMs = config.worksDeadlineDays * 24 * 60 * 60 * 1000;
    const relative = new Date(paidAt.getTime() + daysMs);
    const absolute = new Date(`${config.worksDeadlineAbsolute}T23:59:59+03:00`);
    return relative.getTime() < absolute.getTime() ? relative : absolute;
}
export function formatWorksDeadline(deadline) {
    return deadline.toLocaleString('ru-RU', {
        timeZone: 'Europe/Moscow',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
export function isWorksDeadlinePassed(deadlineIso, now = Date.now()) {
    if (!deadlineIso)
        return true;
    const deadline = Date.parse(deadlineIso);
    return !Number.isFinite(deadline) || now > deadline;
}
export function isValidSocialPostUrl(url) {
    try {
        const parsed = new URL(url.trim());
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    }
    catch {
        return false;
    }
}
export function isStage1Complete(record) {
    return (record.stage1PaymentStatus === 'Оплачено' &&
        Boolean(record.portfolioSubmittedAt) &&
        Boolean(record.socialPostUrl));
}
export function stageLabel(stage) {
    switch (stage) {
        case 'stage1_incomplete':
            return 'Этап 1 — регистрация';
        case 'stage1_waiting_selection':
            return 'Этап 1 — ожидает отбора';
        case 'stage2_nominations':
            return 'Этап 2 — выбор номинаций';
        case 'stage2_works':
            return 'Этап 2 — сдача работ';
        case 'stage3_finalist':
            return 'Финал';
        case 'stage3_not_finalist':
            return 'Завершено';
        case 'rejected_selection':
            return 'Не прошёл отбор';
        default:
            return stage ?? '—';
    }
}

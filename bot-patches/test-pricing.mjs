import { calculateNominationsTotal } from './dist/services/competition.js';

const pro1 = calculateNominationsTotal(['hairdresser|futurism']);
console.log('1 pro:', pro1.total);

const pro3 = calculateNominationsTotal(['hairdresser|futurism', 'barber|futurism', 'makeup|star_podium']);
console.log('3 pro:', pro3.total, 'unit', pro3.proUnit);

const creative2 = calculateNominationsTotal(['creative|essay_rus', 'creative|photo']);
console.log('2 creative:', creative2.total);

const mixed = calculateNominationsTotal(['hairdresser|futurism', 'creative|essay_rus', 'creative|photo']);
console.log('mixed:', mixed.total, 'pro', mixed.proTotal, 'creative', mixed.creativeTotal);

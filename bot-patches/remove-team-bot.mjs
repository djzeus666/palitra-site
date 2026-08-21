#!/usr/bin/env node
import fs from 'fs';

const path = '/app/dist/bot/catalog.js';
let text = fs.readFileSync(path, 'utf8');

// Remove team specialty block from SPECIALTIES array
const startMarker = "    {\n        id: 'team',";
const start = text.indexOf(startMarker);
if (start < 0) {
  // try alternate formatting
  const alt = text.indexOf("id: 'team'");
  if (alt < 0) {
    console.log('team specialty not found — already removed?');
    process.exit(0);
  }
  console.error('Found team id but unexpected formatting');
  process.exit(1);
}

// Find the closing of this object: next "    {\n        id:" after start, or end of array
let i = start;
let depth = 0;
let begun = false;
for (; i < text.length; i++) {
  const ch = text[i];
  if (ch === '{') {
    depth++;
    begun = true;
  } else if (ch === '}') {
    depth--;
    if (begun && depth === 0) {
      i++; // include closing brace
      break;
    }
  }
}
// include trailing comma and whitespace/newline
while (i < text.length && (text[i] === ',' || text[i] === '\r')) i++;
if (text[i] === '\n') i++;

const removed = text.slice(start, i);
text = text.slice(0, start) + text.slice(i);
fs.writeFileSync(path, text);
console.log('removed team specialty, chars:', removed.length);
console.log('still has team?', text.includes("id: 'team'"));

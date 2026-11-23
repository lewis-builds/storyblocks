/* Build the client-side UK primary-school index for the sponsorship
   type-ahead, from the DfE "Get Information About Schools" (GIAS) open data.
   No backend: the output is a static JSON the browser fetches once.

   1. Download the full establishment CSV ("edubasealldata<date>.csv") from
      https://get-information-schools.service.gov.uk/Downloads
      (All establishment data -> CSV). It is Windows-1252 encoded.
   2. Run:  node scripts/build-schools-index.mjs path/to/edubasealldata.csv
   3. It writes public/schools-index.json — an array of compact records:
      { u: URN, n: name, t: town, p: postcode }
      filtered to OPEN schools whose phase/type is primary (incl. infant,
      junior, first). Sorted by name.

   Re-run whenever you refresh the GIAS download. The file is ~1-2 MB gzipped
   and loads lazily on first interaction with the school search. */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2];
if (!src) {
  console.error('Usage: node scripts/build-schools-index.mjs <edubasealldata.csv>');
  process.exit(1);
}

/* Minimal RFC-4180-ish CSV parser (handles quotes, escaped quotes, commas,
   newlines inside quoted fields). GIAS is Windows-1252; decode as latin1 which
   is close enough for the name/town/postcode fields we keep. */
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\r') { /* ignore */ }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const raw = readFileSync(src, 'latin1');
const rows = parseCSV(raw);
if (!rows.length) { console.error('No rows parsed.'); process.exit(1); }

const header = rows[0].map((h) => h.trim());
const col = (name) => header.findIndex((h) => h.toLowerCase() === name.toLowerCase());

const iURN = col('URN');
const iName = col('EstablishmentName');
const iStatus = col('EstablishmentStatus (name)');
const iPhase = col('PhaseOfEducation (name)');
const iType = col('TypeOfEstablishment (name)');
const iTown = col('Town');
const iPostcode = col('Postcode');

if ([iURN, iName, iStatus].some((n) => n < 0)) {
  console.error('Could not find expected GIAS columns (URN / EstablishmentName / EstablishmentStatus). Headers seen:', header.slice(0, 10));
  process.exit(1);
}

const PRIMARY = /primary|infant|junior|first/i;
const out = [];
for (let r = 1; r < rows.length; r++) {
  const row = rows[r];
  if (!row[iURN]) continue;
  if ((row[iStatus] || '').trim().toLowerCase() !== 'open') continue;
  const phase = (iPhase >= 0 ? row[iPhase] : '') || '';
  const type = (iType >= 0 ? row[iType] : '') || '';
  if (!PRIMARY.test(phase) && !PRIMARY.test(type)) continue;
  out.push({
    u: row[iURN].trim(),
    n: (row[iName] || '').trim(),
    t: (iTown >= 0 ? row[iTown] : '').trim(),
    p: (iPostcode >= 0 ? row[iPostcode] : '').trim(),
  });
}

out.sort((a, b) => a.n.localeCompare(b.n));
const dest = resolve(ROOT, 'public/schools-index.json');
writeFileSync(dest, JSON.stringify(out));
console.log(`Wrote ${out.length.toLocaleString()} primary schools -> ${dest}`);

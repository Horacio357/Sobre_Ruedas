const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, 'apps', 'web', 'lib', 'mock-data.ts');
const mockData = fs.readFileSync(mockDataPath, 'utf8');
const lines = mockData.split('\n');

const idx = lines.findIndex(l => l.includes('NUEVOS PRODUCTOS DE CATÁLOGO'));
if (idx !== -1) {
    const newLines = lines.slice(0, idx);
    newLines.push('];');
    fs.writeFileSync(mockDataPath, newLines.join('\n'), 'utf8');
    console.log("Truncated mock-data.ts at line " + idx);
}

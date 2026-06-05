const fs = require('fs');
const mockDataPath = './apps/web/lib/mock-data.ts';
let data = fs.readFileSync(mockDataPath, 'utf8');

// Replace duplicate updated_at
data = data.replace(/updated_at: new Date\(\)\.toISOString\(\),\s*updated_at: new Date\(\)\.toISOString\(\),/g, 'updated_at: new Date().toISOString(),');
data = data.replace(/updated_at: new Date\(\)\.toISOString\(\),\s*updated_at: new Date\(\)\.toISOString\(\)/g, 'updated_at: new Date().toISOString()');

fs.writeFileSync(mockDataPath, data);
console.log('Fixed dupes');

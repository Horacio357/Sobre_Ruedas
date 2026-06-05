const fs = require('fs');
const mockDataPath = './apps/web/lib/mock-data.ts';
let data = fs.readFileSync(mockDataPath, 'utf8');

data = data.replace(/created_at: new Date\(\)\.toISOString\(\)(,?)/g, 'created_at: new Date().toISOString(),\n    updated_at: new Date().toISOString()$1');

fs.writeFileSync(mockDataPath, data);
console.log('Fixed updated_at');

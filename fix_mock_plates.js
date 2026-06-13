const fs = require('fs');

const path = 'apps/web/lib/mock-data.ts';
let content = fs.readFileSync(path, 'utf8');

// I will just replace the specific lines
content = content.replace(
  "{ id: 'img5_1', product_id: 'p5', url: 'https://i.ibb.co/k51S22Kx/Roll-Line-ruedas-giotto.png', sort_order: 0, is_primary: true }",
  "{ id: 'img5_1', product_id: 'p5', url: '/images/placeholder.png', sort_order: 0, is_primary: true }"
);

content = content.replace(
  "{ id: 'img_pm4', product_id: 'pm4', url: 'https://i.ibb.co/jvMxyczh/Roll-Line-ruedas-magnum.png', sort_order: 0, is_primary: true }",
  "{ id: 'img_pm4', product_id: 'pm4', url: '/images/placeholder.png', sort_order: 0, is_primary: true }"
);

content = content.replace(
  "{ id: 'img_pm5', product_id: 'pm5', url: 'https://i.ibb.co/7NSXMRkk/Roll-Line-ruedas-boxer.png', sort_order: 0, is_primary: true }",
  "{ id: 'img_pm5', product_id: 'pm5', url: '/images/placeholder.png', sort_order: 0, is_primary: true }"
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed plates!');

const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'apps', 'web'), function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // find all <img or <motion.img that don't have referrerPolicy
    content = content.replace(/(<(?:img|motion\.img)[^>]*?)(?<!referrerPolicy="no-referrer")(\/?>)/g, function(match, p1, p2) {
      if (p1.includes("referrerPolicy")) return match;
      return p1 + ' referrerPolicy="no-referrer" ' + p2;
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});

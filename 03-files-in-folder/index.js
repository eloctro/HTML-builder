const fs = require('fs');
const path =require('path')

fs.readdir(
  path.join(__dirname, "secret-folder"),
  { withFileTypes: true },
  (err, items) => {
    if (err) throw err;
    items.forEach(element => {
      if (element.isFile()) {
        fs.stat(path.join(__dirname, "secret-folder", element.name), (err, stats) => {
        if (err) throw err;
        let file = element.name.split('.');
        console.log(`${file[0]} - ${file[1]} - ${(stats.size/1024).toFixed(2)}kb`);
      });
      }
    });
    
  }
);
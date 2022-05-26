const fs = require("fs");
const { basename } = require("path");
const path = require("path");

fs.readdir(
  path.join(__dirname, "secret-folder"),
  { withFileTypes: true },
  (err, items) => {
    if (err) throw err;
    items.forEach((element) => {
      if (element.isFile()) {
        fs.stat(
          path.join(__dirname, "secret-folder", element.name),
          (err, stats) => {
            if (err) throw err;
            let fileName = path.parse(
              `D:\\JSFE_2022Q1\\projects\\HTML-builder\\03-files-in-folder\\secret-folder\\${element.name}`
            ).name;
            let ext = element.name.split(".")
            console.log(
              `${fileName} - ${ext[ext.length-1]} - ${(stats.size / 1024).toFixed(2)}kb`
            );
          }
        );
      }
    });
  }
);

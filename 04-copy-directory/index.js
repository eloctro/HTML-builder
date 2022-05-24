const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, (err) => {
  if (err) {
    console.log(err);
  }

  fs.readdir(path.join(__dirname, "files-copy"), (err, itemsNew) => {
    if (err) throw err;
    itemsNew.forEach((elem) => {
      fs.unlink(path.join(__dirname, "files-copy", `${elem}`), (err) => {
        if (err) throw err;
      });
    });
  });

  fs.readdir(path.join(__dirname, "files"), (err, items) => {
    if (err) throw err;
    items.forEach((elem) => {
      fs.copyFile(
        path.join(__dirname, "files", `${elem}`),
        path.join(__dirname, "files-copy", `${elem}`),
        (err) => {
          if (err) throw err;
        }
      );
    });
  });
});

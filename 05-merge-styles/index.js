const fs = require("fs");
const path = require("path");

fs.writeFile(path.join(__dirname, "project-dist", "bundle.css"), "", (err) => {
  if (err) {
    throw err;
  }
});

fs.readdir(
  path.join(__dirname, "styles"),
  { withFileTypes: true },
  (err, items) => {
    if (err) throw err;
    items.forEach((element) => {
      let ext = element.name.split(".")[1];
      if (element.isFile() && ext === "css") {
        let rs = fs.createReadStream(
          path.join(__dirname, "styles", `${element.name}`)
        );
        rs.on("data", (chunk) => {
          fs.appendFile(
            path.join(__dirname, "project-dist", "bundle.css"),
            chunk.toString(),
            (err) => {
              if (err) {
                throw err;
              }
            }
          );
        });
      }
    });
  }
);

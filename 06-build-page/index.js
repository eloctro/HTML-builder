const { stdin, stdout } = process;
const fs = require("fs");
// const fs = require('fs').promises;
const path = require("path");
const readline = require("readline");

async function readFile(filePath) {
    try {
      const data = await fs.readFile(filePath);
      console.log(data.toString());
    } catch (err) {
      console.log(err);
    }
  }

const reader = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, "template.html")),
});

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
});
//создание файла index.html в папке project-dist
fs.writeFile(path.join(__dirname, "project-dist", "index.html"), "", (err) => {
  if (err) {
    throw err;
  }
});

reader.on("line", (line) => {
  if (line.includes("{{header}}")) {
    // let rsHeader = fs.createReadStream(
    //   path.join(__dirname, "components", "header.html")
    // );

    // rsHeader.on("data", (chunk) => {
    //   fs.appendFile(
    //     path.join(__dirname, "project-dist", "index.html"),
    //     `${chunk.toString()}\n`,
    //     (err) => {
    //       if (err) {
    //         throw err;
    //       }
    //     }
    //   );
    // });
    // fs.readFile(
    //   path.join(__dirname, "components", "header.html"),
    //   "utf-8",
    //   (err, data) => {
    //     if (err) throw err;
    //     console.log(data);
    //     fs.appendFile(
    //       path.join(__dirname, "project-dist", "index.html"),
    //       `${data}\n`,
    //       (err) => {
    //         if (err) throw err;
    //       }
    //     );
    //   }
    // );
    readFile();

  } else if (line.includes("{{articles}}")) {
    let rsArticles = fs.createReadStream(
      path.join(__dirname, "components", "articles.html")
    );
    rsArticles.on("data", (chunk) => {
      fs.appendFile(
        path.join(__dirname, "project-dist", "index.html"),
        `${chunk.toString()}\n`,
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
    });
  } else if (line.includes("{{footer}}")) {
    let rsFooter = fs.createReadStream(
      path.join(__dirname, "components", "footer.html")
    );
    rsFooter.on("data", (chunk) => {
      fs.appendFile(
        path.join(__dirname, "project-dist", "index.html"),
        `${chunk.toString()}\n`,
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
    });
  } else {
    // console.log(line);
    fs.appendFile(
      path.join(__dirname, "project-dist", "index.html"),
      `${line}\n`,
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  }
});

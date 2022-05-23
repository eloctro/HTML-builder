const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

stdout.write("Введите текст...\n");
fs.writeFile(path.join(__dirname, "text.txt"), "", (err) => {
  if (err) throw err;
});

reader.on("line", (line) => {
  if (line === "exit") {
    process.exit();
  } else {
    fs.appendFile(path.join(__dirname, "text.txt"), `${line}\n`, (err) => {
      if (err) throw err;
    });
  }
});

process.on("exit", () => stdout.write("\nУспехов в учебе!!!"));

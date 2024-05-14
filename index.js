import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
        message: "Type in your URL...",
        name: "URL",
    }
  ])
  .then((answers) => {
    const url = answers.URL;
    const folderName = `${url}`;
    try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
        }
      } catch (err) {
        console.error(err);
      }
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream(`${folderName}/${url}.png`));
    fs.writeFile(`${folderName}/${url}.txt`, url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
  });
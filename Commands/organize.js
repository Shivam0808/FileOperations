const fs = require("fs");
const { Module } = require("module");
const path = require("path");

let types = {
  media: ["mp4", "mkv", "mp3", "jpeg", "jpg", "png", "svg"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

function organizeFn(dirPath) {
  let destPath;
  if (dirPath == undefined) {
    console.log("Please enter valid path");
    return;
  }

  let doesExist = fs.existsSync(dirPath);

  if (doesExist == true) {
    destPath = path.join(dirPath, "organized_Files");

    if (fs.existsSync(destPath) == false) {
      fs.mkdirSync(destPath);
    } else {
      console.log("folder already exist");
    }
  } else {
    console.log("Please enter a valid path");
  }

  organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
  let childName = fs.readdirSync(src);
  // console.log(childName)

  for (let i = 0; i < childName.length; i++) {
    let childAddress = path.join(src, childName[i]);
    let isFile = fs.lstatSync(childAddress).isFile();

    if (isFile == true) {
      let fileCategory = getCategory(childName[i]);
      console.log(childName[i] + " belongs to " + fileCategory);
      sendFiles(childAddress, dest, fileCategory);
    }
  }
}

function getCategory(Filename) {
  let ext = path.extname(Filename).slice(1);

  // console.log(ext)

  for (let type in types) {
    let cTypeArr = types[type];
    // console.log(cTypeArr)

    for (let i = 0; i < cTypeArr.length; i++) {
      if (ext == cTypeArr[i]) {
        return type;
      }
    }
  }
  return "others";
}

function sendFiles(srcFilePath, dest, fileCategory) {
  let catPath = path.join(dest, fileCategory);
  if (fs.existsSync(catPath) == false) {
    fs.mkdirSync(catPath);
  }

  let Filename = path.basename(srcFilePath);
  let destFilePath = path.join(catPath, Filename);

  fs.copyFileSync(srcFilePath, destFilePath);
  fs.unlinkSync(srcFilePath);
  console.log("File Organized");
}

module.exports = {
  organizeFnKey: organizeFn,
};

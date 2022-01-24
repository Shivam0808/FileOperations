// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders
const { isFile } = require("babel-types");
const fs = require("fs");
const path = require("path");
const helpModule = require("../commands/help");
const organizeModule = require("../commands/organize");
const treeModule = require("../commands/tree");
const { dirname } = require("path/posix");
let input = process.argv.slice(2);
let inputArr = input;
let command = inputArr[0];

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

switch (command) {
  case "tree":
    treeModule.treeFnKey(inputArr[1]);
    break;
  case "organize":
    organizeModule.organizeFnKey(inputArr[1]);
    break;
  case "help":
    helpModule.helpFnKey();
    break;
  default:
    console.log("Please enter a valid input");
    break;
}

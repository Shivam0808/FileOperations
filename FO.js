// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders
const { isFile } = require('babel-types')
const fs = require('fs')
const path = require('path')
const { dirname } = require('path/posix')
let input = process.argv.slice(2)
let inputArr = input
let command = inputArr[0]

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
    case 'tree':
        treeFn(inputArr[1])
        break;
    case 'organize':
        organizeFn(inputArr[1])
        break;
    case 'help':
        helpFn()
        break;
    default:
        console.log("Please enter a valid input")
        break;
}

function helpFn(){
    console.log(`List of all commands ->
                    1) Tree - node FO.js tree <dirPath>
                    2) Organize - node FO.js organize <dirPath>
                    3) Help - node FO.js help`)
}

function organizeFn(dirPath) 
{
    let destPath
    if (dirPath == undefined)
    {
        console.log("Please enter valid path")
    return;
    }

    let doesExist = fs.existsSync(dirPath)

    if (doesExist == true) 
    {
        destPath = path.join(dirPath, 'organized_Files')

            if (fs.existsSync(destPath)==false) {
                    fs.mkdirSync(destPath)
            }
            else
            {
                console.log('folder already exist')
            }
    }
    else
    {
        console.log("Please enter a valid path")
    }

    organizeHelper(dirPath, destPath)
}




function organizeHelper(src, dest) {
    let childName = fs.readdirSync(src)
    // console.log(childName)

    for (let i = 0; i < childName.length; i++) {
        let childAddress = path.join(src, childName[i]) 
        let isFile = fs.lstatSync(childAddress).isFile()

        if(isFile==true)
        {
           let fileCategory = getCategory(childName[i]) 
           console.log(childName[i] + ' belongs to ' + fileCategory)
           sendFiles(childAddress, dest, fileCategory )
        }
             
    }
}

function getCategory(Filename)
{
    let ext = path.extname(Filename).slice(1)

    // console.log(ext)

    for(let type in types)
    {
        let cTypeArr = types[type]
        // console.log(cTypeArr)

        for (let i = 0; i < cTypeArr.length; i++) {
            if(ext == cTypeArr[i])
            {
                return type
            }
            
        }
    }
    return 'others'
}

function sendFiles(srcFilePath, dest, fileCategory) 
{
    let catPath = path.join(dest, fileCategory)
    if (fs.existsSync(catPath)==false) {
        fs.mkdirSync(catPath)
    }

    let Filename = path.basename(srcFilePath)
    let destFilePath = path.join(catPath, Filename)
    
    fs.copyFileSync(srcFilePath, destFilePath)
    fs.unlinkSync(srcFilePath)
    console.log('File Organized')
}

function treeFn(dirPath){
    if(dirPath==undefined){
      console.log('Please Enter a Valid Path')
      return;
    }

    else{
      let doesExist = fs.existsSync(dirPath)
      if(doesExist == true){
        treeHelper(dirPath , ' ')
      }
    }
}


function treeHelper(targetPath , indent){
     let isFile = fs.lstatSync(targetPath).isFile()
     


     if(isFile==true)
     {
         let fileName = path.basename(targetPath)
         console.log(indent + "├── " + fileName)
     }
     else
     {
        let dirName = path.basename(targetPath)
         console.log(indent + "└──" + dirName)
        
         let children = fs.readdirSync(targetPath)

         for (let i = 0; i < children.length; i++) {
             let childpath = path.join(targetPath, children[i])
             
             treeHelper(childpath, indent + "\t")
         }
        }
}
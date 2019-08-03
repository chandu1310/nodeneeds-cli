import * as fs from 'fs';

const AdmZip = require('adm-zip');
const username = require("os").userInfo().username;

const customizePackageJSON = (appname, packageJSON) => {
  const json = JSON.parse(packageJSON);
  json.name = appname.toLowerCase();
  json.description = 'Generated with nodeneeds utility.';
  json.keywords.push(appname);
  json.author = username;

  return JSON.stringify(json, null, 2);
}

export const extractFile = (details) => {
  const { appname, fileDestination } = details;
  return new Promise( (resolve, reject) => {
    try{
      const releaseArchive = `${fileDestination}/released-version.zip`;
      const zip = new AdmZip(releaseArchive);
      const zipEntries = zip.getEntries();
      zipEntries.forEach((zipEntry) => {
        const fileName = zipEntry.entryName;
        if( !fileName.endsWith('.lock') && !fileName.endsWith('lock.json') ){
          const newFileName = `${process.cwd()}/${appname}/${fileName.substring(fileName.indexOf("/") + 1)}`;
          if( !fs.existsSync(newFileName) ){
            if( zipEntry.isDirectory ){
              // console.log(`Creating directory: ${newFileName}`);
              fs.mkdirSync(newFileName);
            } else {
              let fileContent;
              fileContent = fileName.endsWith('package.json') ? customizePackageJSON(appname, zip.readAsText(fileName)) : zip.readAsText(fileName);
              // console.log(`Creating new file: ${newFileName}`);
              fs.writeFile(newFileName, fileContent);  
            }
          }
        }
        });
        resolve(details);
    }catch(er){
      // console.log(er);
      reject(er);
    }
  });
}

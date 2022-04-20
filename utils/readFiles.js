import fs from 'fs';
import path from 'path';

export default async function readFiles(dir, processFile) {
    // read directory
    fs.readdir(dir, (error, fileNames) => {
      if (error) throw error;
  
      fileNames.forEach(filename => {
        // get current file name
        const name = path.parse(filename).name;
        // get current file extension
        const ext = path.parse(filename).ext;
        // get current file path
        const filepath = path.resolve(dir, filename);
  
        // get information about the file
        fs.stat(filepath, function(error, stat) {
          if (error) throw error;
  
          // check if the current path is a file or a folder
          const isFile = stat.isFile();
  
          // exclude folders
          if (isFile) {
            // callback, do something with the file
            processFile(filepath, name, ext, stat);
          }
        });
      });
    });
  };
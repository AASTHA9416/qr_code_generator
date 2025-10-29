

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'node:fs';
inquirer
  .prompt([
    /* Pass your questions in here */{
        message:"enter the url:",
        name:"URL",
    },
  
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url=answers.URL;
    console.log(url); 
var qr_svg = qr.image(url);
qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));
 
 fs.writeFile("url1.txt",url,(err)=>{
      if(err) throw error;
     console.log("this file has been saved");
  });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("prompt can never be rendered");
    } else {
      // Something else went wrong
      console.log("there is something wrong");
    }
  });
 

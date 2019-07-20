const catFact = require('./src/catfacts.js');
const lodash = require('lodash');
const wallpaper = require('./src/wallpaper');
var sys = require('util')
var exec = require('child_process').exec;
module.exports = exec


const command = process.argv[2];
const commandOpt = process.argv[3];
switch (command) {
    case 'catfact': {
        fileID = catFact.random
        if (commandOpt != NaN) {
            catFact.makePdf(commandOpt, fileID).then(pdfUrl => {
                exec(`echo "Opening PDF!"`, function (err, stdout, stderr) {
                    if (err) {
                        // should have err.code here?  
                    }
                    exec(`chromium "${process.cwd()}/media/pdfs/${pdfUrl}"`)
                });
            })
        }
    }
        break;
    case 'wallpaper': {
        if (commandOpt) {
            wallpaper.setWallpaper(commandOpt)
        }
        wallpaper.setWallpaper()
    }
}
if (command === 'download') {
    wallpaper.downloadPic('cat')

}



// dir = exec("ls -la", function (err, stdout, stderr) {
//     if (err) {
//         // should have err.code here?  
//     }
//     console.log(stdout);
// });

// dir.on('exit', function (code) {
//     // exit code is code
// });
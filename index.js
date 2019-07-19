const catFact = require('./src/catfacts.js')
const lodash = require('lodash')
var sys = require('util')
var exec = require('child_process').exec;


const command = process.argv[2];
const commandOpt = process.argv[3];

if (command === 'catfact') {
    fileID = catFact.random
    if (commandOpt != NaN) {
        catFact.makePdf(commandOpt, fileID).then(() => {
            console.log('Wooot hope this works')
            exec(`echo ./media/pdfs/catFacts${fileID}`, function (err, stdout, stderr) {
                if (err) {
                    // should have err.code here?  
                }
                console.log(stdout);
            });
        })
    } else {
        catFact.then(() => {
            exec(`xdg-open ./media/pdfs/catFacts${fileID}`, function (err, stdout, stderr) {
                if (err) {
                    // should have err.code here?  
                }
                console.log('launched');
            });
        })
    }
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
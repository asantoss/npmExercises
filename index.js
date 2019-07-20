const catFact = require('./src/catfacts.js');
const lodash = require('lodash');
const fs = require('fs')
const wallpaper = require('./src/wallpaper');
var sys = require('util');
var exec = require('child_process').exec;
module.exports = exec



fs.readdir(`${process.cwd()}/media/pdfs`, (err, files) => {
    if (files && files.length > 5) {
        let i = 0
        files.forEach(file => {
            i++
            fs.unlink(`${process.cwd()}/media/pdfs/${file}`, err => {
                if (err) { throw err }
            })
        })
        console.log('Deleted ' + i + ' files')
    }
})

const command = process.argv[2];
const commandOpt = process.argv[3];
switch (command) {
    case 'catfact':
        {
            if (commandOpt != NaN) {
                //We run this function to download a picture of a kitty for our pdf.
                wallpaper.downloadPic('cat', commandOpt).then(url => {
                    setTimeout(() => {
                        let fileID = catFact.random
                        //Our make pdf function takes the url of the image we download and pushes it into the file.
                        catFact.makePdf(commandOpt, fileID, url).then(pdfUrl => {
                            //This switch statement detects your current os and determines how to best open the file so you can see the kitty!
                            var path2file = `${process.cwd()}/media/pdfs/${pdfUrl}`
                            switch (process.platform) {
                                case 'linux': {
                                    console.log(process.platform)
                                    exec(`xdg-open "${process.cwd()}/media/pdfs/${pdfUrl}"`)
                                    break;
                                }
                                case 'darwin': {
                                    exec(`open "${path2file}"`)
                                    break;
                                }
                                case 'win32': {
                                    exec(`${path2file}`, function (err, stdout, stderr) {
                                        if (err) throw (err)
                                        exec(`${pdfUrl}`)
                                    })
                                    break;
                                }
                            }
                            console.log('Ready!')
                            return url
                        }).then(url => {
                            //Once the pdf has been open the image we downloaded is deleted
                            fs.unlink(url, (err) => {
                                if (err) throw err;
                            });
                        })
                    }, 2000)
                }).catch(err => {
                    console.log(`Couldn't make it for ya chief.`)
                })
            }
        }
        break;
    case 'wallpaper':
        {
            //We run this file with comman opt to change the wall paper on an interval in seconds
            if (commandOpt) {
                wallpaper.setWallpaper(commandOpt)
            }
            wallpaper.setWallpaper()
        }
        break;
    default:
        {
            console.log(`You could run any of these commands \n
        catfact #s
        number of facts desired the default is 1 \n
        wallpaper #s
        time of each wallpaper change the default is once`)
        }
}
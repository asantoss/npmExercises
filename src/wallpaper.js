const wallpaper = require('wallpaper');
const downloadFile = require('download-file');
const axios = require('axios');
const lodash = require('lodash');
var exec = require('child_process').exec;
const catFact = require('./catfacts.js');

var options = {
    directory: './media/images',
    filename: "dogPic.jpg"
}

const getMeDoggos = function (time) {
    if (time) {
        time = time * 1000;
        setInterval(() => {
            wallpaper.set(downloadPic('dog').toString())
        }, time)
        console.log('Giving you a doggo every ' + time / 1000 + 's.')
    } else {
        wallpaper.set(downloadPic('dog'))
    }
}

const downloadPic = function (animal, commandOpt) {
    return new Promise(resolve => {
        var url;
        let fileID = lodash.random(1, 255)
        switch (animal) {
            case 'dog':
                url = `${process.cwd()}/media/images/dogPic.jpg`
                axios.get('https://dog.ceo/api/breeds/image/random')
                    .then(res => {
                        downloadFile(res.data.message, options, function (err) {
                            if (err) throw err;
                            return resolve(url)
                        })
                    })
                break;
            case 'cat':
                url = `${process.cwd()}/media/images/cat${fileID}.jpg`;
                axios.get('https://api.thecatapi.com/v1/images/search?format=json').then(res => {
                    downloadFile(res.data[0].url, { directory: `${process.cwd()}/media/images`, filename: `cat${fileID}.jpg` }, function (err, data) {
                        if (err) {
                            throw err
                        }
                        resolve(url)
                    })
                })
                break;
        }
    }, reject => {
        reject(console.error)
    })
}

const makePDF =

    module.exports = {
        'setWallpaper': getMeDoggos,
        'downloadPic': downloadPic
    }
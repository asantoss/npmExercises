const wallpaper = require('wallpaper');
const downloadFile = require('download-file');
const axios = require('axios');
const lodash = require('lodash')

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

const downloadPic = function (animal) {
    var url;
    let fileID = lodash.random(1, 255)
    switch (animal) {
        case 'dog':
            url = `./media/images/dogPic.jpg`
            axios.get('https://dog.ceo/api/breeds/image/random')
                .then(res => {
                    downloadFile(res.data.message, options, function (err) {
                        if (err) throw err;
                    })
                })
            break;
        case 'cat':
            url = `./media/images/cat${fileID}`
            downloadFile('https://cataas.com/cat/cute', { directory: './media/images', filename: `cat${fileID}.jpg` }, function (err) {
                if (err) throw err;
            })
            // axios.get('https://cataas.com/cat/cute')
            //     .then(res => {
            //         console.log(res)
            //         // downloadFile(res.data.message, options, function (err) {

            //         //     if (err) throw err;
            //         // })
            //     })
            break;
    }
    return url
}

module.exports = {
    'setWallpaper': getMeDoggos,
    'downloadPic': downloadPic
}
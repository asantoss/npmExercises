const wallpaper = require('wallpaper');
const downloadFile = require('download-file');
const axios = require('axios');

var options = {
    directory: './images',
    filename: "dogPic.jpg"
}


setInterval(() => {
    axios.get('https://dog.ceo/api/breeds/image/random')
        .then(res => {
            downloadFile(res.data.message, options, function (err) {
                if (err) throw err;
                wallpaper.set('./images/dogPic.jpg')
            })
        })
}, 2000)
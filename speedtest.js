var speedTest = require('speedtest-net');
var test = speedTest({ maxTime: 5000 })

// test.on('data', data => {
//     console.dir(data)
// })
// test.on('error', err => {
//     console.error(err)
// })

speedTest.visual({ maxTime: 5000 }, (err, data) => {
    console.dir(data)
})
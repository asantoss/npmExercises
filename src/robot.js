const robotjs = require('robotjs');


function moveMouse() {
    robotjs.moveMouse(510, 1159);
    return new Promise((resolve, reject) => {
        mousePos = robotjs.getMousePos()
        if (mousePos.x === 510 && mousePos.y == 1159) {
            console.log(mousePos)
            robotjs.mouseClick('left', false)
            resolve()
        }
    })
}

moveMouse().then(() => {
    return setTimeout(() => {
        robotjs.typeString('Google.com')
        robotjs.keyTap('enter')
    }, 1000)
}).then(() => {
    return setTimeout(() => {
        mouse = robotjs.getMousePos()
        robotjs.moveMouse(789, 1518)
        if (mouse.x === 789 && mouse.y === 1518) {
            return robotjs.getMousePos()
        } else {
            robotjs.moveMouse(789, 1518)
            return robotjs.getMousePos()
        }
    }, 3000)
}).then(mouse => {
    setTimeout(() => {
        mouse = robotjs.getMousePos()
        if (mouse.x === 789 && mouse.y === 1518) {
            robotjs.mouseClick('left', false)
            robotjs.typeString('Cute Doggos');
            robotjs.keyTap('enter')
        }
    }, 5000)
})

// console.log(robotjs.getMousePos())
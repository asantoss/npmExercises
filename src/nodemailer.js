"user strict";

const mailer = require('nodemailer');

let arg = process.argv[2]
if (arg === undefined) {
    console.log('Please give me an email!')
} else {
    main(arg)
}

async function main(arg) {
    var transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alexsantosantana71@gmail.com',
            pass: ''
        }
    });
    const mailOptions = {
        from: 'alexsantosantana71@gmail.com', // sender address
        to: `${arg}`, // list of receivers
        subject: 'This is a test', // Subject line
        html: `<h1>Hello</h1><p>This is a message writting with javascript!</p>`// plain text body
    };
    await transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    // console.log("Message sent:", info.messageId);
    // console.log("Preview URL", mailer.getTestMessageUrl(info));
}

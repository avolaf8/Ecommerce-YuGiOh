const nodemailer = require('nodemailer');

function emailVerification(email) {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        // service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "elyssa.johnson79@ethereal.email",
            pass: "GGJ67aaPeFuNaDBZky"
        },
        // debug: true,
        // logger: true
    });

    const option = {
        from: "elyssa.johnson79@ethereal.email",
        to: email,
        subject: "Welcome to ZENITH COMPANY for more informatiom or event we have, please join our  Newsletter",
        html: "<b>Your Account has been create</b>"
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(option, (error, info) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            resolve('success')
            console.log("sent: " + info);
        })
    })
}

module.exports = emailVerification
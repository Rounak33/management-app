const validator = require("validator");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cleanUpAndValidate = ({ name, email, username, phone, password }) => {
    return new Promise((res, rej) => {
        if (!name || !email || !username || !phone || !password) {
            rej('invalid credentials')
        };
        if (typeof (email) !== 'string' || !email.includes('@') || !email.includes('.')) {
            rej('enter valid email ');
        };
        if (typeof (name) !== 'string' || name.length <= 3 || name.length >= 49) {
            rej('enter valid name');
        };
        if (typeof (username) !== 'string' || username.length <= 3 || username.length >= 49) {
            rej('enter valid username');
        };
        if (typeof phone !== "string" || phone.length !=10) {
            rej("Invalid phone");
        };
        if (typeof (password) !== 'string' || password.length <= 3 || password.length >= 49) {
            rej('enter valid password');
        };
        res();
    })
}
const secretKey = "This is module test";
const generateJwtToken = (email) => {
    const jwtToken = jwt.sign({ email: email }, secretKey, { expiresIn: "15d" });
    return jwtToken;
}
const sendverificationToken = (email, token) => {
    console.log(email + " " + token);
    let mailer = nodemailer.createTransport({
        host: "smtp.google.com",
        port: 465,
        secure: true,
        service: "Gmail",
        auth: {
            user: "cravi6635@gmail.com",
            pass: "ycaslxxppocoozdo",
        },
    });
    let mailOptions = {
        from: "Module-Test",
        to: email,
        subject: "Email verification for module-test",
        html: `click<a href="http://localhost:8000/verify/${token}">Here</a>`,
    }
    mailer.sendMail(mailOptions, function (error, response) {
        if (error) throw error;
        else console.log('mail has been sent successfully');
    })
}

module.exports = { cleanUpAndValidate, generateJwtToken, sendverificationToken,secretKey };
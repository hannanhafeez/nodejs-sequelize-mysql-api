const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    // host: 'mail.ebmacs.com',
    // port: 465,
    // auth: {
    //     user: 'developer@ebmacs.com',
    //     pass: 'ebmacs1234!@#$'
    // }
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'ebmacs@zohomail.com',
        pass: '0312alee'
    }

});
module.exports = transporter;
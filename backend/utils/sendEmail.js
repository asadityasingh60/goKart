const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const userEmail = process.env.SMPT_MAIL;
    const userPass = process.env.SMPT_PASSWORD
    const transporter = nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        port: 465,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: userEmail,
            pass: userPass
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

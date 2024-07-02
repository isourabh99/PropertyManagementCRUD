// const nodemailer = require("nodemailer");

// exports.sendmail = async (req, res) => {
//     console.log(req.body.email);
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.MAILER_USERNAME,
//             pass: process.env.MAILER_PASS, // Use app-specific password if 2FA is enabled
//         },
//     });

//     try {
//         let info = await transporter.sendMail({
//             from: '"sheryian" <mrsourabh05@gmail.com>', // sender address
//             to: req.body.email, // list of receivers
//             subject: "QUERY", // Subject line
//             text: req.body.writeToUs, // plain text body
//         });

//         return res.redirect("/");
//     } catch (error) {
//         console.error('Error: ', error);
//         return res.status(500).json({error: error.message});
//     }
// };
const nodemailer = require("nodemailer");

exports.sendmail=async (req,res)=>{
const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASS,
    },
});

// async..await is not allowed in global scope, must use a wrapper
try {
  
    const info = await transporter.sendMail({
        // from: `"Leap real estates.ltd 👻" <${req.body.email}>`, // sender address
        from: `"${req.body.email}" <${req.body.email}>`,
        to: process.env.MAILER_USERNAME, // list of receivers
        subject: `QUERY from, ${req.body.email}✔`, // Subject line
        text:req.body.writeToUs, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    res.redirect("/")
} catch (error) {
    console.log(error.message);
}

}



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



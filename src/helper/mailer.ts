import nodemailer from "nodemailer"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import User from "@/models/userModel"
import connectToDatabase from "@/dbConfig/connection"

connectToDatabase()

dotenv.config()

export default async function mailer(email:string, emailType:string, userName:string) {
    const emailToken=await bcrypt.hash(userName, 10)
    const encodedEmailToken = encodeURIComponent(emailToken);

    if(emailType==="VERIFY"){
        await User.findOneAndUpdate({email},{verifyToken:emailToken,verifyTokenExpiry:Date.now()+3600000})
    }
    else if(emailType==="RESET"){
        await User.findOneAndUpdate({email},{forgotPasswordToken:emailToken,forgotPasswordTokenExpiry:Date.now()+3600000})
    }

    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

try {
  const info = await transporter.sendMail({
    from: '"Flushvichi" <contact.vichanshu@gmail.com>', // sender address
    to: email, // list of recipients
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // subject line
    html: emailType === "VERIFY" ? `<p>Hi ${userName}, please click on the link to verify your email:</p><p><a href="${process.env.DOMAIN}/api/verifymail?token=${encodedEmailToken}">Verify Email</a></p>` : `<p>Hi ${userName}, please click on the link to reset your password:</p><p><a href="${process.env.DOMAIN}/reset-password?token=${encodedEmailToken}">Reset Password</a></p>`, // HTML body
  });

  console.log("Email sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}


}






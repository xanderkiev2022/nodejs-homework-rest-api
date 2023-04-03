const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const baseURL = process.env.BASE_URL;

function sendVerificationEmail(email, verificationToken) {
  try {
    const msg = {
      //   to: `"${email}"`,
      to: "xanderkiev@gmail.com",
      from: "301019a@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: `Verification link: ${baseURL}/api/users/verify/${verificationToken}`,
    //   html: `Verification `,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {}
}

module.exports = {
  sendVerificationEmail,
};

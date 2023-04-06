const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "301019a@gmail.com" };
  await sgMail.send(email);
  console.log('Email sent');
  return true;
};

module.exports = {
  sendEmail,
};

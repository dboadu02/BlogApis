import nodemailer from 'nodemailer'

//this is a utility function to send emails
export const sendMail = async ({ mailFrom, mailTo, subject, body }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //send mail
    const info = await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      html: body,
    });
    return info;
  } catch (err) {
    console.log(err.message);
  }
};

import * as sgMail from "@sendgrid/mail";
import ClientResponse from "@sendgrid/helpers/classes/response";

type mailInfo = {
  email: string;
  code: number;
};

async function sendEmail({
  email,
  code,
}: mailInfo): Promise<[ClientResponse, {}]> {
  sgMail.setApiKey(process.env.MAIL_API_KEY);
  const msg = {
    to: email,
    from: "wasd12.ns@gmail.com",
    subject: "Auth code from e-commerce",
    text: `Hi, your Auth code is ${code}, remember that it will expire in twenty minutes!`,
    html: `<h2>Hi, your Auth code is ${code}</h2><br><p>Remember that it will expire in twenty minutes!</p>`,
  };
  return await sgMail.send(msg);
}

async function sendPaymentStatusEmail(
  email: string,
  status: string
): Promise<[ClientResponse, {}]> {
  sgMail.setApiKey(process.env.MAIL_API_KEY);
  const msg = {
    to: email,
    from: "wasd12.ns@gmail.com",
    subject: `Purchase payment status ${status}`,
    text: `Hi, Your payment was ${status}, please go to the site to have more details`,
    html: `<h2>Hi, Your payment was ${status}</h2><br><p>please go to the site to have more details</p>`,
  };
  return await sgMail.send(msg);
}

export { sendEmail, sendPaymentStatusEmail };

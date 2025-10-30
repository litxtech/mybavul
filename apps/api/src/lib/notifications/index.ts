import nodemailer from "nodemailer";

export function mailer(){
  const host = process.env.EMAIL_SMTP_HOST;
  const user = process.env.EMAIL_SMTP_USER;
  const pass = process.env.EMAIL_SMTP_PASS;
  if (!host || !user || !pass) throw new Error('smtp_not_configured');
  return nodemailer.createTransport({ host, auth: { user, pass } });
}
export async function sendEmail(to: string, subject: string, html: string){
  const t = mailer();
  await t.sendMail({ from: process.env.EMAIL_FROM||'no-reply@mybavul.com', to, subject, html });
}

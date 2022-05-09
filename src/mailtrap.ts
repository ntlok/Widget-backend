import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4f2158df9129e9",
    pass: "4a903aff870ea4"
  }
});
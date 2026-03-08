import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendContactEmail(data: any) {
  await transporter.sendMail({
    from: "samratdhanashreeutube@gmail.com",
    to: "samratdhanashreeutube@gmail.com",
    subject: "New Contact Message - Wholesome Pilgrims",
    text: `
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}

Message:
${data.message}
    `,
  });
}
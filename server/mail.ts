import nodemailer from "nodemailer";
import dns from "dns";

export async function sendContactEmail(data: any) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  console.log("Printing creds: "+process.env.EMAIL_USER+" "+process.env.EMAIL_PASSWORD);
  if (!user || !pass) {
    throw new Error(
      `Email credentials missing. EMAIL_USER=${user ? "set" : "MISSING"}, EMAIL_PASSWORD=${pass ? "set" : "MISSING"}`
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
    // Force IPv4 — prevents ENETUNREACH on servers without IPv6 outbound
    lookup: (hostname: string, options: any, callback: any) => {
      dns.lookup(hostname, { ...options, family: 4 }, callback);
    },
    tls: {
      rejectUnauthorized: true,
    },
  } as any);

  await transporter.sendMail({
    from: `"The Wholesome Pilgrims Co." <${user}>`,
    to: user,
    replyTo: data.email,
    subject: `New Message from ${data.firstName} ${data.lastName} — Wholesome Pilgrims`,
    text: `Name: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:24px;border:1px solid #e5e0d8;border-radius:8px">
        <h2 style="margin:0 0 16px;font-size:20px;color:#36291e">New contact message</h2>
        <p style="margin:0 0 8px;color:#555"><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p style="margin:0 0 8px;color:#555"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <hr style="border:none;border-top:1px solid #e5e0d8;margin:16px 0"/>
        <p style="white-space:pre-wrap;color:#333">${data.message}</p>
      </div>
    `,
  });
}

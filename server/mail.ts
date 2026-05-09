import nodemailer from "nodemailer";
import dns from "dns/promises";

async function resolveIPv4(hostname: string): Promise<string> {
  const addresses = await dns.resolve4(hostname);
  if (!addresses.length) throw new Error(`No IPv4 address found for ${hostname}`);
  return addresses[0];
}

export async function sendContactEmail(data: any) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      `Email credentials missing. EMAIL_USER=${user ? "set" : "MISSING"}, EMAIL_PASSWORD=${pass ? "set" : "MISSING"}`
    );
  }

  // Resolve Gmail SMTP to IPv4 first — prevents ENETUNREACH on hosts without IPv6 outbound (e.g. Render)
  const smtpHost = await resolveIPv4("smtp.gmail.com");

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
    tls: {
      // Must supply servername because we connect via IP, not hostname
      servername: "smtp.gmail.com",
      rejectUnauthorized: true,
    },
  });

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

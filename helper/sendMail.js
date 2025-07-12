const nodemailer = require("nodemailer");
const juice = require("juice");
const mailTemplates = require("./mailTemplates");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = async ({ to, slug, data }) => {
  try {
    const templateFn = mailTemplates[slug];

    if (!templateFn) {
      throw new Error(`No email template found for slug: ${slug}`);
    }

    const { subject, text, html } = templateFn(data);

    // Inline CSS if HTML is present
    const inlinedHtml = html ? juice(html) : undefined;

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html: inlinedHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = sendMail;

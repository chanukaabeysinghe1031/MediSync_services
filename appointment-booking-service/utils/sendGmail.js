const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config();

async function sendEmail(patientEmail) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  try {
    const mailOptions = {
      from: {
        name: "Appointment Booking Service - Codesprint",
        address: process.env.USER,
      },
      to: patientEmail, // for multiple emails, use an array
      subject: "Appointment Confirmation",
      text: "Your appointment has been confirmed",
      html: "<b>Your appointment has been confirmed</b>",
      attachments: [
        {
          filename: "appointment_details.pdf",
          //   path: path.join(__dirname, "/appointment_details.pdf"),
          path: "appointment-booking-service/appointment_detail_pdfs/appointment_details.pdf",
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendEmail };

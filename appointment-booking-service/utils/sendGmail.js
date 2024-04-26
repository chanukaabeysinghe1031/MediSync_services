const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config();

async function sendEmail(patientEmail, appointmentDetails) {
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
      text:
        "Your appointment has been confirmed\n\n" +
        "Appointment Details: \n" +
        "Hospital: " +
        appointmentDetails.hospital.name +
        "\n" +
        "Location: " +
        appointmentDetails.hospital.location +
        "\n" +
        "Doctor: " +
        appointmentDetails.doctor.name +
        "\n" +
        "Appointment Date: " +
        appointmentDetails.appointment_date +
        "\n\n" +
        "Please carry this email to the hospital for verification.",
      html:
        "<b>Your appointment has been confirmed</b><br><br>" +
        "<strong>Appointment Details:</strong><br>" +
        "Hospital: <strong>" +
        appointmentDetails.hospital.name +
        "</strong><br>" +
        "Location: <strong>" +
        appointmentDetails.hospital.location +
        "</strong><br>" +
        "Doctor: <strong>" +
        appointmentDetails.doctor.name +
        "</strong><br>" +
        "Appointment Date: <strong>" +
        appointmentDetails.appointment_date +
        "</strong><br><br>" +
        "Please carry this email to the hospital for verification.",
      // attachments: [
      //   {
      //     filename: "appointment_details.pdf",
      //     //   path: path.join(__dirname, "/appointment_details.pdf"),
      //     path: "appointment-booking-service/appointment_detail_pdfs/appointment_details.pdf",
      //     contentType: "application/pdf",
      //   },
      // ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendEmail };

const express = require("express");
const schedule = require("node-schedule");
const path = require("path");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// appointment booking

app.post("/book-appointment", (req, res) => {
  const { name, email, date } = req.body;

  sendEmail(email);

  res.status(200).send("appointment booked successfully");
});

// const scheduleAppointment = (date, callback) => {
//   //todo : add validation to check if date is in the future
//   //todo :save the appointment to a database
//   schedule.scheduleJob(date, () => {
//     // Execute callback function when appointment time arrives
//     callback();

//     console.log("appointment scheduled");
//   });
// };

//send email
const nodemailer = require("nodemailer");

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

const sendEmail = async (transporter, patientEmail) => {
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
          path: path.join(__dirname, "appointment_details.pdf"),
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

sendEmail(transporter, mailOptions);

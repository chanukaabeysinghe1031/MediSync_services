const express = require("express");
const schedule = require("node-schedule");
const path = require("path");
const nodemailer = require("nodemailer");

// const createClient = require("@supabase/supabase-js").createClient;
const morgan = require("morgan");
const bodyParser = require("body-parser");

// const addNewDoctor = require("./addNewDataAPIs").addNewDoctor;

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;
const dataRoutes = require("./routes/routes");

app.use(express.json());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: process.env.USER,
//     pass: process.env.APP_PASSWORD,
//   },
// });

// const sendEmail = async (transporter, patientEmail) => {
//   try {
//     const mailOptions = {
//       from: {
//         name: "Appointment Booking Service - Codesprint",
//         address: process.env.USER,
//       },
//       to: patientEmail, // for multiple emails, use an array
//       subject: "Appointment Confirmation",
//       text: "Your appointment has been confirmed",
//       html: "<b>Your appointment has been confirmed</b>",
//       attachments: [
//         {
//           filename: "appointment_details.pdf",
//           path: path.join(__dirname, "appointment_details.pdf"),
//           contentType: "application/pdf",
//         },
//       ],
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.log(error);
//   }
// };

// app.post("/book-appointment", (req, res) => {
//   const { name, email, date } = req.body;

//   sendEmail(transporter, email);

//   res.status(200).send("appointment booked successfully");
// });

const getAvailableAppointments =
  require("../dal/appointmentDAL").getAvailableAppointments;

const bookAppointment = require("../dal/appointmentDAL").bookAppointment;
const getAppointmentDetails =
  require("../dal/appointmentDAL").getAppointmentDetails;

const sendEmail = require("../utils/sendGmail").sendEmail;

async function getAvailableAppointmentsController(req, res) {
  const { specialty } = req.body;

  try {
    const result = await getAvailableAppointments(specialty);
    res.status(200).json({
      message: "Available appointments fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching available appointments", data: error });
  }
}

async function bookAppointmentController(req, res) {
  const { patientId, patientEmail, appointmentId } = req.body;

  try {
    const result = await bookAppointment(patientId, appointmentId);

    res.status(200).json({
      message: "Appointment booked successfully",
      data: result,
    });

    const appointmentDetails = await getAppointmentDetails(appointmentId);

    sendEmail(patientEmail, appointmentDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error booking appointment", data: error });
  }
}

module.exports = {
  getAvailableAppointmentsController,
  bookAppointmentController,
};

const addNewPatient = require("../dal/dataDAL").addNewPatient;
const addNewDoctor = require("../dal/dataDAL").addNewDoctor;
const addNewHospital = require("../dal/dataDAL").addNewHospital;
const addNewAvailableAppointment =
  require("../dal/dataDAL").addNewAvailableAppointment;

async function addPatient(req, res) {
  const { name, age, email } = req.body;

  try {
    const result = await addNewPatient(name, age, email);
    res
      .status(200)
      .json({ message: "Patient added successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding patient", data: error });
  }
}

async function addDoctor(req, res) {
  const { name, email, specialty, hospital_id } = req.body;

  try {
    const result = await addNewDoctor(name, email, specialty, hospital_id);
    res
      .status(200)
      .json({ message: "Doctor added successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding doctor", data: error });
  }
}

async function addHospital(req, res) {
  const { name, location } = req.body;

  try {
    const result = await addNewHospital(name, location);
    res
      .status(200)
      .json({ message: "Hospital added successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding hospital", data: error });
  }
}

async function addAvailableAppointment(req, res) {
  const { doctor_id, hospital_id, appointment_date } = req.body;

  try {
    const result = await addNewAvailableAppointment(
      doctor_id,
      hospital_id,
      appointment_date
    );
    res
      .status(200)
      .json({ message: "Appointment added successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding appointment", data: error });
  }
}

module.exports = {
  addPatient,
  addDoctor,
  addHospital,
  addAvailableAppointment,
};

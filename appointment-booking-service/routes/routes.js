const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const appointmentController = require("../controllers/appointmentController");

router.post("/add-patient", dataController.addPatient);
router.post("/add-doctor", dataController.addDoctor);
router.post("/add-hospital", dataController.addHospital);
router.post(
  "/add-available-appointment",
  dataController.addAvailableAppointment
);

router.post(
  "/get-available-appointments",
  appointmentController.getAvailableAppointmentsController
);
router.post(
  "/book-appointment",
  appointmentController.bookAppointmentController
);

module.exports = router;

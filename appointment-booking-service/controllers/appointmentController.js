const getAvailableAppointments =
  require("../dal/appointmentDAL").getAvailableAppointments;

async function getAvailableAppointmentsController(req, res) {
  const { email } = req.body;

  try {
    const result = await getAvailableAppointments(email);
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

module.exports = {
  getAvailableAppointmentsController,
};

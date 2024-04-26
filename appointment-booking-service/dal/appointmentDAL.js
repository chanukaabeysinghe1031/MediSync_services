const supabaseClient = require("../supabaseClient").supabaseClient;

async function getAvailableAppointments(email) {
  const { data, error } = await supabaseClient
    .from("doctors")
    .select("id")
    .eq("email", email);

  if (error) {
    console.log(error);
    return "Error fetching doctor id";
  }

  const doctorId = data[0].id;

  // get available appointments for the doctor
  const { data: appointmentsData, error: appointmentsError } =
    await supabaseClient
      .from("appointments")
      .select("id,appointment_date,hospital_id")
      .eq("doctor_id", doctorId)
      .not("booked", "eq", true);

  if (appointmentsError) {
    console.log(appointmentsError);
    return "Error fetching available appointments";
  }

  //get hospital details
  for (let i = 0; i < appointmentsData.length; i++) {
    const { data: hospitalData, error: hospitalError } = await supabaseClient
      .from("hospitals")
      .select("name,location")
      .eq("id", appointmentsData[i].hospital_id);

    if (hospitalError) {
      console.log(hospitalError);
      return "Error fetching hospital details";
    }

    appointmentsData[i].hospital = hospitalData[0];
  }

  return appointmentsData;
}

async function bookAppointment(patientId, appointmentId) {
  const { data, error } = await supabaseClient
    .from("appointments")
    .update({ booked: true, patient_id: patientId })
    .eq("id", appointmentId);

  if (error) {
    console.log(error);
    return "Error booking appointment";
  }
}

module.exports = {
  getAvailableAppointments,
  bookAppointment,
};

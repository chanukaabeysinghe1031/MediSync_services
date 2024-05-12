const supabaseClient = require("../supabaseClient").supabaseClient;

async function getAvailableAppointments(specialty) {
  const { data: doctorsData, error } = await supabaseClient
    .from("doctors")
    .select("*")
    .eq("specialty", specialty);

  if (error) {
    console.log(error);
    return "Error fetching doctor id";
  }

  console.log(doctorsData);

  for (let i = 0; i < doctorsData.length; i++) {
    const doctorId = doctorsData[i].id;

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
    doctorsData[i].appointments = appointmentsData;
  }
  return doctorsData;
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

async function getAppointmentDetails(appointmentId) {
  const { data, error } = await supabaseClient
    .from("appointments")
    .select("id,appointment_date,hospital_id,patient_id,doctor_id")
    .eq("id", appointmentId);

  if (error) {
    console.log(error);
    return "Error fetching appointment details";
  }

  const appointmentDetails = data[0];

  // get hospital details
  const { data: hospitalData, error: hospitalError } = await supabaseClient
    .from("hospitals")
    .select("name,location")
    .eq("id", appointmentDetails.hospital_id);

  if (hospitalError) {
    console.log(hospitalError);
    return "Error fetching hospital details";
  }

  appointmentDetails.hospital = hospitalData[0];

  // get doctor details
  const { data: doctorData, error: doctorError } = await supabaseClient
    .from("doctors")
    .select("name,email")
    .eq("id", appointmentDetails.doctor_id);

  if (doctorError) {
    console.log(doctorError);
    return "Error fetching doctor details";
  }

  appointmentDetails.doctor = doctorData[0];

  // get patient details
  const { data: patientData, error: patientError } = await supabaseClient
    .from("patients")
    .select("name,email")
    .eq("id", appointmentDetails.patient_id);

  if (patientError) {
    console.log(patientError);
    return "Error fetching patient details";
  }

  appointmentDetails.patient = patientData[0];

  return appointmentDetails;
}

module.exports = {
  getAvailableAppointments,
  bookAppointment,
  getAppointmentDetails,
};

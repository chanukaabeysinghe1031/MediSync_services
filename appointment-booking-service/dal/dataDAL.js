const supabaseClient = require("../supabaseClient").supabaseClient;

async function addNewPatient(name, age, email) {
  const { data, error } = await supabaseClient
    .from("patients")
    .insert([{ name, age, email }]);

  if (error) {
    console.log(error);
    return "Error adding patient";
  }

  return "Patient added successfully";
}

async function addNewDoctor(name, email, specialty, hospital_id) {
  const { data, error } = await supabaseClient
    .from("doctors")
    .insert([{ name, specialty, hospital_id, email }]);

  if (error) {
    console.log(error);
    return "Error adding doctor";
  }

  return "Doctor added successfully";
}

async function addNewHospital(name, location) {
  const { data, error } = await supabaseClient
    .from("hospitals")
    .insert([{ name, location }]);

  if (error) {
    console.log(error);
    return "Error adding hospital";
  }

  return "Hospital added successfully";
}

async function addNewAvailableAppointment(
  doctor_id,
  hospital_id,
  appointment_date
) {
  const { data, error } = await supabaseClient
    .from("appointments")
    .insert([{ doctor_id, hospital_id, appointment_date }]);

  if (error) {
    console.log(error);
    return "Error adding appointment";
  }

  return "Appointment added successfully";
}

module.exports = {
  addNewPatient,
  addNewDoctor,
  addNewHospital,
  addNewAvailableAppointment,
};

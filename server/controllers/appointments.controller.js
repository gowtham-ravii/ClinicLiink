const Appointment = require('../model/appointments.model')

const createAppointment =  (req, res) => {
    const { doctorName, pemail, patientName, date, time, doctorSpeciality, doctorLocation, status } = req.body;
    const appointment = new Appointment({
      doctorName,
      pemail,
      patientName,
      date,
      time,
      doctorSpeciality,
      doctorLocation,
      status
    });
    appointment
      .save()
      .then(() => {
        res.status(201).json({ message: "Appointment booked successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
}
const fetchAppointment = (req, res) => {
    const pemail = req.params.pemail;
    Appointment
      .find({ pemail: pemail })
      .then((appointments) => {
        res.status(200).json(appointments.sort((a, b) => a.date - b.date));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
}

const deleteAppointment = (req, res) => {
    const id = req.params.id;
    Appointment
      .findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({ message: "Appointment cancelled successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
    }

module.exports = {
    createAppointment,
    fetchAppointment,
    deleteAppointment
}
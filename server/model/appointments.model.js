// appointment.model.js

const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  doctorName: {
    type: String,
    required: true
  },
  pemail: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  doctorSpeciality: {
    type: String,
    required: true
  },
  doctorLocation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;

const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  hospital: {
    type: String,
    required: true
  }
});

const DoctorModel = mongoose.model('doctors', DoctorSchema); // Corrected model name
module.exports = DoctorModel;
const DoctorModel = require("../model/doctors.model");


const fetchDoctor = (req, res) => {
    DoctorModel
      .find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
      });
}

module.exports = {
    fetchDoctor
}
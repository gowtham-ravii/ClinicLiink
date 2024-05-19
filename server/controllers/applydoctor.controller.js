const ApplyDoctorModel = require("../model/doctorapply.model"); // Corrected import

 const applyDoctor = (req, res) => { // Corrected route definition
    const { name, email, phone, address, qualification, speciality, experience, hospital } = req.body;
    ApplyDoctorModel 
      .findOne({ email: email })
      .then((userExist) => {
        if (userExist) {
          return res.status(422).json({ error: "Email already exists" });
        }
        const user = new ApplyDoctorModel({ // Corrected model name
          name,
          email,
          phone,
          address,
          qualification,
          speciality,
          experience,
          hospital,
        });
        user
          .save()
          .then(() => {
            res.status(201).json({ message: "Doctor application submitted successfully" });
          })
          .catch((err) => {
            res.status(500).json({ error: "Failed to submit application" });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

module.exports = {
    applyDoctor
}
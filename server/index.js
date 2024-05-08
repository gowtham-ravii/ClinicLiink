const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./model/user.model");
const ApplyDoctorModel = require("./model/doctorapply.model"); // Corrected import
const DoctorModel = require("./model/doctors.model");
const app = express();
const { Contact } = require('./model/contact.model')
const Appointment = require("./model/appointments.model");
app.use(express.json());
app.use(cors());

mongoose
  .connect("your mongo uri")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    userModel
        .findOne({ email: email })
        .then((userExist) => {
        if (!userExist) {
            return res.status(422).json({ error: "Invalid Email" });
        }
        if (password === userExist.password) {
            res.status(201).json({ message: "Login Successful" });
        } else {
            res.status(422).json({ error: "Invalid Password" });
        }
        })
        .catch((err) => {
        console.log(err);
        });
    });
app.post("/register", (req, res) => {
  const { name, email, password, phone, address, DOB, bloodgroup } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !address ||
    !DOB ||
    !bloodgroup
  ) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  userModel
    .findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email already exists" });
      }
      const user = new userModel({
        name,
        email,
        password,
        phone,
        address,
        DOB,
        bloodgroup,
      });
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "User registered successfully" });
        })
        .catch((err) => {
          res.status(500).json({ error: "Failed to register" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/user/:email", (req, res) => {
  const email = req.params.email;
  userModel
    .findOne({ email: email })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/applydoctor", (req, res) => { // Corrected route definition
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
});

app.get('/doctors', (req, res) => {
  DoctorModel
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  Contact
    .findOne({ email: email })
    .then((user) => {
      const contact = new Contact({
        name,
        email,
        message
      });
      contact.save()
        .then(() => {
          res.status(201).json({ message: "Message passed" });
        })
        .catch((err) => {
          res.status(500).json({ error: "Message not Passed" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.put("/user/:email", (req, res) => {
  const email = req.params.email;
  const updatedData = req.body;
  userModel
    .findOneAndUpdate({ email: email }, updatedData, { new: true })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
app.get("/user/:email", (req, res) => {
  const email = req.params.email;
  userModel
    .findOne({ email: email })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
app.post("/appointment", (req, res) => {
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
});

app.get("/appointments/:pemail", (req, res) => {
  const pemail = req.params.pemail;
  Appointment
    .find({ pemail: pemail })
    .then((appointments) => {
      res.status(200).json(appointments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

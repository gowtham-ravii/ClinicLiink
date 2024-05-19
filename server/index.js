const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");


const app = express();
const appointmentRouter = require('./routes/appointments')
const doctorRouter = require('./routes/doctors')
const userRouter = require('./routes/user')
const contactRouter = require('./routes/contact')
const applyDoctorRouter = require('./routes/applydoctor')

app.use(express.json());
app.use(cors());

app.use('/appointment', appointmentRouter)
app.use('/doctors', doctorRouter)
app.use('/user', userRouter)
app.use('/contact',contactRouter)
app.use('/applydoctor',applyDoctorRouter)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
       console.log("Connected to MongoDB");
       app.listen(process.env.PORT, () => {
          console.log("Server is running on port 5000");
       });
  })
  .catch((err) => {
    console.log(err);
  });












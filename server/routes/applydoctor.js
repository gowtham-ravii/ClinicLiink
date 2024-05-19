const express = require('express')
const {applyDoctor} = require('../controllers/applydoctor.controller')
const applyDoctorRouter = express.Router()

applyDoctorRouter.post("/",applyDoctor);
  

module.exports = applyDoctorRouter
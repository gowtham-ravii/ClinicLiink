const express = require('express')

const doctorRouter = express.Router()
const {fetchDoctor} = require('../controllers/doctor.controller')


doctorRouter.get('/', fetchDoctor);


   

module.exports = doctorRouter


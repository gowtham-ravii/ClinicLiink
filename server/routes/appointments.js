const express = require('express')
const {createAppointment,fetchAppointment,deleteAppointment} = require('../controllers/appointments.controller')
const appointmentRouter = express.Router()

appointmentRouter.post('/', createAppointment)

appointmentRouter.get('/:pemail', fetchAppointment)

appointmentRouter.delete('/:id', deleteAppointment)

module.exports = appointmentRouter

 
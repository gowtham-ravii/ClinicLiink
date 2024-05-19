const express = require('express')
const {sendMessage} = require('../controllers/contact.controller')
const contactRouter = express.Router();

contactRouter.post('/', sendMessage);

module.exports = contactRouter
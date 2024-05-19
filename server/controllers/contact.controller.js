const { Contact } = require('../model/contact.model')


const sendMessage = (req, res) => {
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
  }

  module.exports ={
    sendMessage
  }
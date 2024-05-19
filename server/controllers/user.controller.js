const userModel = require("../model/user.model");

const loginUser = (req, res) => {
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
            return res.status(201).json({ message: "Login Successful" });
        } else {
            return res.status(422).json({ error: "Invalid Password" });
        }
        })
        .catch((err) => {
        console.log(err);
        });
}

const registerUser = (req, res) => {
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
  }

const getUser = (req,res)=>{
    const email = req.params.email;
    userModel
      .findOne({ email: email })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
      });
}

const updateUser = (req,res)=>{
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
}

const getUser2 = (req,res)=>{
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
}

const updateUser2 = (req, res) => {
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
    }

module.exports = {
    loginUser,
    getUser,
    getUser2,
    updateUser,
    updateUser2,
    registerUser
}
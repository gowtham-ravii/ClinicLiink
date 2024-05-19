const express = require('express')

const userRouter = express.Router()
const {loginUser,registerUser,getUser,getUser2,updateUser,updateUser2} = require('../controllers/user.controller')
userRouter.get('/:email',getUser)

userRouter.put('/:email',updateUser)

userRouter.get('/:email',getUser2)
userRouter.put("/:email", updateUser2)
userRouter.post("/login", loginUser);
userRouter.post("/register",registerUser);
  

module.exports = userRouter

  
  
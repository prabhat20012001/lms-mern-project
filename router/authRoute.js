const express=require('express')

const {getUser, signup,signin } = require('../controller/authController')
const jwtAuth = require('../middleware/jwtAuth')

const authRouter=express.Router()


authRouter.post('/signup',signup)
authRouter.post('/signin',signin)
authRouter.get('/user',jwtAuth, getUser)





module.exports=authRouter
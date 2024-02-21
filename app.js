const express=require('express')
const app=express()
const cookieParser=require('cookie-parser')
// imoprting routes
const authRouter=require('./router/authRoute')
const databaseconnect = require('./config/databaseConfig')


// database connection function-call
databaseconnect()

// middleware
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth/',authRouter)



app.use('/',(req,res)=>{
    res.status(200).json({data:"jwtauth server.."})
})


module.exports=app






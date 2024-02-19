const express=require('express')

const app=express()


app.use('/',(req,res)=>{
    res.status(200).json({data:"jwtauth server.."})
})


module.exports=app






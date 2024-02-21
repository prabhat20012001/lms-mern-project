const JWT=require('jsonwebtoken')

const jwtAuth=(req,res,next)=>{
const token=(req.cookies && req.cookies.token) || null
if(!token){
    res.status(400).json({
        sucsess:false,
        message:'token does not exists so you are not authorized '
    })
}

try {
    const payload=JWT.verify(token,process.env.SECRET)
    req.user={id:payload.id,email:payload.email}

} catch (error) {
    return res.status(400).json({
        sucsess:false,
        message:"Not authorized"
    })
}

    next()
}
module.exports=jwtAuth
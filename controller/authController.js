const userModel=require('../model/userSchema')
const emailValidator=require('email-validator')
const signup=async(req,res,next)=>{
    const {name,email,password,confirmPassword}=req.body

if(!name || !email || !password || !confirmPassword){
    return res.status(400).json({
        success:false,
        message:'Every field is required'
    })
}

const validEmail=emailValidator.validate(email)
if(!validEmail){
    return res.status(400).json({
        success:false,
        message:'Please provide a valid email id'
    })
}

if(password!==confirmPassword){
    return res.status(400).json({
        success:false,
        message:"Password and confirm password doesn't match"
    })
}


try {
            const userinfo=userModel(req.body)

            const result=await userinfo.save()

            return res.status(200).json(
            {
                success:true,
                data:result
            })
    
} catch (error) {
    if(error.code===11000){
        return res.status(400).json({
            success:false,
            message:'Account alredy exists with provided email-id'
        })

    }
return res.status(400).json({
    success:false,
    message:error.message
})
    
}

}
module.exports = {
    signup
};

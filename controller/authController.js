const userModel=require('../model/userSchema')
const JWT=require('jsonwebtoken')

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




const signin=async(req,res,next)=>{
const {email,password}=req.body
console.log(email,password)

if(!email || !password){
    return res.status(400).json({
        success:false,
        message:'Every field is mandatory'
    })
}

try {

    const user=await userModel.findOne(
        {
            email
        }
    ).select('+password')
     console.log('email',email,'user:',user)
    
    if(!user || user.password !==password){
        return res.status(400).json({
            success:false,
            message:'Invalid crendentials'
        })
    }
    const token=user.jwtToken();
    user.password=undefined;
    
    const cookieOption={
        maxAge:24*60*60*1000,
        httpOnly:true
    }
    
    res.cookie('token',token,cookieOption);
    res.status(200).json({
        success:true,
        data:user
    })
} catch (error) {
    
res.status(400).json({
    success:false,
    message:error.message
})


}





}



module.exports = {
    signup,signin
};

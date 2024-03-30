import AppError from "../utils/error.utils"



// **********************************************************************************register*****************************************************
const register=async(req,res,next)=>{
    // frontend se post request ka data body me hota hai i.e we are taking data from body
const {fullName,email,password}=req.body

// validation for user has given required field or not
if(!fullName || !email  || !password){
    return next (new AppError('All fields are required',400))
}

// looking for database user exist or not
const userExists= await User.findOne({email})

if(userExists){
    return next (new AppError('Email already exist',400))
}

// if user does not exist create new 
const user=await User.create({
    fullName,email,password,avatar:{
        public_id:email,
        secure_url:"https://res.cloudinary.com/du9jzqlpt/image/upload"
    }
})

if(!user){
    return next(new AppError('User registration failed,please try again '))
}

// TODO:File Upload
await user.save()

}

// **********************************************************************************login*****************************************************

const login=(req,res)=>{
    
}


const logout=(req,res)=>{
    
}

const getProfile=(req,res)=>{
    
}

export {
    register,login,logout,getProfile
}
const mongoose=require('mongoose')

const {Schema}=mongoose;


const userSchema=new Schema({
    name:{
        type:String,
        required:[true,'user name is Required'],
        minLength:[5,'Name must be at least 5 char'],
        maxLength:[50,'Name must be less than 50 char']
    },
    email:{
        type:String,
        required:[true,'user email is Required'],
unique:true,
lowercase:true,
unique:[true,'already registered']
        

    },
    password:{
        type:String,

    },
    forgetPasswordToken:{
        type:String,

    },
    forPasswordExpiryDate:{
        type:String,

    }
},
    {
        timestamps:true
    }

)



const userModel=mongoose.model('user',userSchema)

module.exports=userModel
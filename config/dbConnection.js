import mongoose from "mongoose"

mongoose.set('strictQuery',false);

const connectionToDB=async()=>{
   try {
    const {connection}=await mongoose.connect(
        process.env.MONGO_URI || 'mongodb://localhost:27017/lms'
    )

    if(connection){
        console.log(`connected to mongoDB:${connection.host}`)
    }
   } 
   
   catch (error) {
    console.log(error)
    process.exit(1)
   }
}

export default connectionToDB;

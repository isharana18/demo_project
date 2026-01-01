import mongoose from 'mongoose'

const connectToDB =async()=>{
    try {
        const conn = mongoose.connect("mongodb://localhost:27017/demo_project")
        console.log("mongoDb connected Successfully: ");
        
    } catch (error) {
        console.error("mongoDb Failed To Connect",error.message);
        
    }
}

export default connectToDB
import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    date:{
        type:String,
        require:true,
    },
    time:{
        type:String,
        require:true,
    },
    host:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    }
})

 const eventModel = mongoose.model('Event',eventSchema)
 export default eventModel
import mongoose from 'mongoose'

const membershipSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    cost:{
        type:String,
        require:true,
    },
    duration:{
        type:String,
        require:true,
    },
    type:{
        type:String,
        require:true,
    },
})

 const membershipModel = mongoose.model('Membership',membershipSchema)
 export default membershipModel
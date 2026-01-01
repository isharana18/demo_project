import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    membership:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        require:true,
        enum:['admin','normal'],
        default:'normal'
    },
    
    events:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event',
        default:[]
    }]
})

 const UserModel = mongoose.model('User',userSchema)
 export default UserModel
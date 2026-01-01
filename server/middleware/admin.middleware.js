import jwt from 'jsonwebtoken'
import UserModel from '../model/user.model.js';

export const authAdmin =async(req,res,next)=>{

    try {
         const token =req.headers?.authorization?.split(" ")[1];

    if( !token){
        return res.status(400).json({success:false,message:"Token not exists"})
    }

    const verifyToken = await jwt.verify(token,process.env.SECRETKEY)


    if( !verifyToken){
        return res.status(400).json({success:false,message:"Token is not valid"})
    }

      const user = await UserModel.findOne({_id:verifyToken.id})
    
        if(!user){
             return res.status(400).json({success:false,message:"User not exists"})
        }
    
        if(user.role === "admin"){
             next()
        }
        
        
    } catch (error) {
        res.status(500).json({error:error.message,message:"Server error during authAdmin middleware"})
    }
}


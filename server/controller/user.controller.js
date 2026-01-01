import UserModel from "../model/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import eventModel from "../model/event.model.js";
import membershipModel from "../model/membership.model.js";


export const registerUser =async(req,res)=>{

    try {
         const {name,email,password,membership}=req.body;

    if(!name || !email || !password || !membership){
        return res.status(400).json({success:false,message:"all fields are required"})
    }

    const userExists = await UserModel.findOne({email});

    if(userExists){
        return res.status(400).json({success:false,message:"User already exists"})
    }

    const membershipExists = await membershipModel.findOne({type:membership})

     if(!membershipExists){
        return res.status(400).json({success:false,message:"Membership not exists"})
    }



    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await UserModel.create({
        name,email,password:hashedPassword,membership
    })

    const token = await jwt.sign({id:newUser._id},process.env.SECRETKEY)

    res.status(201).json({success:true,message:"User created successfully",newUser,token})
    } catch (error) {
        res.status(500).json({error:error.message,message:"Server error during register user"})
     }
}

export const loginUser =async(req,res)=>{

    try {
         const {email,password}=req.body;


    if( !email || !password){
        return res.status(400).json({success:false,message:"all fields are required"})
    }

    const userExists = await UserModel.findOne({email});

    if(!userExists){
        return res.status(400).json({success:false,message:"User not exists"})
    }

    const verifyPassword = await bcrypt.compare(password,userExists.password)

     if(!verifyPassword){
        return res.status(400).json({success:false,message:"Invalids credentials"})
    }

     const token = await jwt.sign({id:userExists._id},process.env.SECRETKEY)


    res.status(200).json({success:true,message:"User loggedin successfully",loggedinUser:userExists,token})
    } catch (error) {
        res.status(500).json({error:error.message,message:"Server error during login user"})
      }
}

export const getUserProfile= async(req,res,)=>{
    try {
        const userId= req.user;
        console.log(userId);
        

    const user = await UserModel.findOne({_id:userId})

    if(!user){
         return res.status(400).json({success:false,message:"User not exists"})
    }

   
    res.status(200).json({success:true,message:"fetch user profile successfully",user})
   
    } catch (error) {
          res.status(500).json({error:error.message,message:"Server error during fteching user"})
   
    }
}

export const registerInEvent =async(req,res)=>{
console.log("1");

    try {
        const {id} =req.params;
console.log("23",id);

        const userId = req.user;
        console.log("4");
    if(!id){
        return res.status(400).json({success:false,message:"id not found"})
    }
 console.log("5");
    const eventExists = await eventModel.findOne({_id:id});
 console.log("6");
    if(!eventExists){
        return res.status(400).json({success:false,message:"Event not Found"})
    } console.log("7");

    const userAlreadyEnrolled = await UserModel.findOne({_id:userId,events:{$in:[eventExists._id]}})
     console.log("8");
if(userAlreadyEnrolled){
        return res.status(400).json({success:false,message:"User Already enrolled in Event"})
    }
     console.log("9");
    const updateUser = await UserModel.findOneAndUpdate({_id:userId}, {$push: {events: eventExists._id}})
    await updateUser.save()
    console.log("10",updateUser);

    res.status(200).json({success:true,message:"User registered in event successfully",updateUser})

    } catch (error) {
         console.log("11");
        res.status(500).json({error:error.message,message:"Server error during register event"})
      }
}


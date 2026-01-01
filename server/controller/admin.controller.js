import eventModel from "../model/event.model.js";
import membershipModel from "../model/membership.model.js";
import UserModel from "../model/user.model.js";
import bcrypt from 'bcrypt'

export const createMembership =async(req,res)=>{

    try {
         const {name,cost,duration,type}=req.body;

    if(!name || !cost || !duration || !type){
        return res.status(400).json({success:false,message:"all fields are required"})
    }

    const membershipExists = await membershipModel.findOne({type});

    if(membershipExists){
        return res.status(400).json({success:false,message:`Membership already exists for ${type}`})
    }

    const newMembership = await membershipModel.create(
       {name,cost,duration,type}
    )

    res.status(201).json({success:true,message:`Membership created successfully for ${type}`,newMembership})
    } catch (error) {
        res.status(500).json({error:error.message,message:"Server error during creating membership"})
   
    }
}

export const createEvent =async(req,res)=>{

    try {
         const {title,date,time,host,description}=req.body;

    if(!title || !date || !time || !host || !description){
        return res.status(400).json({success:false,message:"all fields are required"})
    }

    const eventExists = await eventModel.findOne({title});

    if(eventExists){
        return res.status(400).json({success:false,message:`Event already exists `})
    }

    const newEvent = await eventModel.create(
       {title,date,time,host,description}
    )

    res.status(201).json({success:true,message:`Event created successfully`,newEvent})
    } catch (error) {
        res.status(500).json({error:error.message,message:"Server error during creating Event"})
   
    }
}

export const getAllEvents =async(req,res)=>{
    try { 

    const event = await eventModel.find()

    if(!event){
        return res.status(400).json({success:false,message:`No Events Found `})
    }

    res.status(200).json({success:true,message:`All Events fecth successfully`,event})
    } catch (error) {
        res.status(500).json({error:error.message,message:"Server error during fetching Event"})
   
    }
}

export const getAllMembership =async(req,res)=>{
    try { 

    const membership = await membershipModel.find()

    if(!membership){
        return res.status(400).json({success:false,message:`No Membership Found `})
    }

    res.status(200).json({success:true,message:`All membership fecth successfully`,membership})
    } catch (error) {
        res.status(500).json({error:error.message,message:"Server error during fetching membership"})
   
    }
}

export const getAllUsers =async(req,res)=>{
    try { 

    const users = await UserModel.find()

    if(!users){
        return res.status(400).json({success:false,message:`No users Found `})
    }

    res.status(200).json({success:true,message:`All users fecth successfully`,users})
    } catch (error) {
        res.status(500).json({error:error.message,message:"Server error during fetching users"})
   
    }
}

export const createAdminUser =async(req,res)=>{

    try {
         const {name,email,password}=req.body;

    if(!name || !email || !password ){
        return res.status(400).json({success:false,message:"all fields are required"})
    }

    const userExists = await UserModel.findOne({email});

    if(userExists){
        return res.status(400).json({success:false,message:"AdminUser already exists"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newAdminUser = await UserModel.create({
        name,email,password:hashedPassword,role:"admin"
    })

    res.status(201).json({success:true,message:"AdminUser created successfully",newAdminUser})
    } catch (error) {
        res.status(500).json({error:error.message,message:"Server error during creating admin user"})
     }
}
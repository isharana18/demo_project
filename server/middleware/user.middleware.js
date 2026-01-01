import jwt from 'jsonwebtoken'

export const authUser =async(req,res,next)=>{

    try {
         const token =req.headers?.authorization?.split(" ")[1];

    if( !token){
        return res.status(400).json({success:false,message:"Token not exists"})
    }

    const verifyToken = await jwt.verify(token,process.env.SECRETKEY)


    if( !verifyToken){
        return res.status(400).json({success:false,message:"Token is not valid"})
    }

        req.user=verifyToken.id

        next()
    } catch (error) {
        res.status(500).json({error:error.message,message:"Server error during authUser middleware"})
    }
}


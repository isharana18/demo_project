import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectToDB from './config/db.config.js'
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import { authAdmin } from './middleware/admin.middleware.js'


const app =express()
connectToDB()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT ;
app.use('/api/user',userRouter)
app.use('/api/admin',authAdmin,adminRouter)

app.get('/',(req,res)=>{
    res.send("Server running properly")
})

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`);
    
})

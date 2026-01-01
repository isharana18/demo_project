import express from 'express'
import { getUserProfile, loginUser, registerInEvent, registerUser } from '../controller/user.controller.js'
import { authUser } from '../middleware/user.middleware.js'

const router = express.Router()

router.post('/registration',registerUser)
router.post('/login',loginUser)
router.get("/getProfile",authUser,getUserProfile)
router.post("/register-in-event/:id",authUser,registerInEvent)

export default router
import express from 'express'

import { createAdminUser, createEvent, createMembership, getAllEvents, getAllMembership, getAllUsers } from '../controller/admin.controller.js'

const router = express.Router()

router.post('/create-membership',createMembership)
router.post('/create-event',createEvent)
router.get('/get-all-events',getAllEvents)
router.get('/get-all-memberships',getAllMembership)
router.get('/get-all-users',getAllUsers)
router.post('/create-admin-user',createAdminUser)



export default router
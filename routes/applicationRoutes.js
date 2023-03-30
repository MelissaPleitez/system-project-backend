import express from 'express'
import {addApplication, getApplication,deleteApplication, getApplications } from '../controllers/applicationController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const router= express.Router();


router.route('/')
.post(authMiddleware, addApplication)
.get(authMiddleware, getApplication)

router.route('/:id')
.get(authMiddleware, getApplications).delete(authMiddleware, deleteApplication)




// .put(authMiddleware, updateApplication)
export default router;
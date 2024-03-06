// authroutes
import express from 'express';

import {registerUser,loginUser,getProfile} from '../controllers/authControllers.js'

const router= express.Router();


// router.use(cors({origin:'*'}));


router.post('/register', registerUser)

router.post('/login',loginUser);
router.get('/profile',getProfile)

export default router;
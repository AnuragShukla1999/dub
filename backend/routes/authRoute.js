import express from 'express';
import { signup, signin, logout, updateUser } from '../controllers/authController.js';


const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.put('/updateuser/:id', updateUser);


// router.post('/google', google);

export default router;
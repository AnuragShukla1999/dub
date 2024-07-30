import express from 'express';
import { createLocation, getLocation } from '../controllers/LocationController.js';

const router = express.Router();

router.post('/location', createLocation);
router.get('/getlocation/:pincode', getLocation);

export default router;
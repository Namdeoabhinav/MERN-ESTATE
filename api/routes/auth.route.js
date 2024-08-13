import express from 'express';
import { signup , signin, google } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/sign-up" , signup)
//Creating the controller function for signup - auth.controller.js
router.post("/sign-in" , signin)
//Creting the google route.
router.post("/google" , google)


export default router;
import express from 'express';
import { signup , signin, google, signOut } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/sign-up" , signup);
//Creating the controller function for signup - auth.controller.js
router.post("/sign-in" , signin);
//Creating the google route.
router.post("/google" , google);

//Creating the route for signing out the user.
router.get('/sign-out' , signOut);


export default router;
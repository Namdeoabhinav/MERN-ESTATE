import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/sign-up" , signup)
//Creating the controller function for signup - auth.controller.js

export default router;
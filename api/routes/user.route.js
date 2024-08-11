import express from 'express'
import { test } from '../controllers/user.controller.js';

const router = express.Router(); // capable of handling routes independently from the main application.

router.get('/test' , test);

export default router;

//We have to put it in user controller because these logics controls.
// res.json({
//     message: 'Hello!',
// });
import express from 'express'
import { test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test' , test);

export default router;

//We have to put it in user controller because these logics controls.
// res.json({
//     message: 'Hello!',
// });
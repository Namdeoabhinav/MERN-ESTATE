import express from 'express'
import { deleteUser, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router(); // capable of handling routes independently from the main application.

router.get('/test' , test);

//Creating the new api route for updating the user profile.
router.post('/update/:id', verifyToken, updateUser);

//Creating the api route for deleting the user.
router.delete('/delete/:id' , verifyToken,  deleteUser);

export default router;

//We have to put it in user controller because these logics controls.
// res.json({
//     message: 'Hello!',
// });
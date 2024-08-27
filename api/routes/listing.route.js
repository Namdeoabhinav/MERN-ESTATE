import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

//We have to create the listing so using POST.
router.post('/create',verifyToken, createListing);
router.delete('/delete/:id',verifyToken,deleteListing);

export default router;
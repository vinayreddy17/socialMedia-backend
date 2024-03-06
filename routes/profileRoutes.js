import express from 'express';
const router = express.Router();
import * as profileController from '../controllers/profileControllers.js';

// Route to fetch user profile
router.get('/:email', profileController.getUserProfile);

// Route to update user profile
router.put('/:email', profileController.updateUserProfile);

// Route to delete user account
router.delete('/:email', profileController.deleteUserAccount);

export default router;

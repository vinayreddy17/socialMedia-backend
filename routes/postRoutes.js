import express from 'express';
const router = express.Router();
import * as postController from '../controllers/postControllers.js';

// Route to create a new post
router.post('/', postController.createPost);

// Route to get all posts
router.get('/', postController.getAllPosts);

// Route to get a single post by ID
router.get('/:postId', postController.getPostById);

// Route to update a post by ID
router.put('/:postId', postController.updatePost);

// Route to delete a post by ID
router.delete('/:postId', postController.deletePost);

router.post('/:postId/like', postController.likePost);
router.post('/:postId/comment', postController.addComment);

export default router;

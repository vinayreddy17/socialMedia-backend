import Post from '../models/posts.js';

export const createPost = async (req, res) => {
  try {
    const { title, content,name,id } = req.body;
    const author = name; 
    const authorId=id;
    console.log(title, content, author );
    const post = new Post({ title, content, author,authorId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author','name').sort({ createdAt: -1 }); // Populate author field with user's name
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate('author', 'name'); // Populate author field with user's name
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postId, { title, content }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const likePost = async (req, res) => {
    try {
      
      const postId = req.params.postId;
      const userId = req.body.userId;
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      const likedIndex = post.likes.indexOf(userId);
      
      if (likedIndex === -1) {
       
        post.likes.push(userId);
      
      } else {
        
        post.likes.splice(likedIndex, 1);
      }
  
     
      await post.save();
  
      
      return res.status(200).json({ post});
    } catch (error) {
      console.error("Error liking post:", error);
      return res.status(500).json({ error: "Unable to like the post" });
    }
  };
  
  

export const addComment = async (req, res) => {
    try {
      const postId = req.params.postId;
      const text  = req.body.text;
      const name = req.body.name; 
      console.log(postId,text,name);
      const post = await Post.findById(postId);
      console.log(post);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const comment = { text, author: name };
      console.log(comment);
      post.comments.push(comment);
      await post.save();
      console.log(post);
      res.status(201).json({ message: "Comment added successfully", post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
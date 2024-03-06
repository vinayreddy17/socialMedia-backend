import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
//   author: {
//     type: Schema.Types.ObjectId,
//     ref: "User", // Reference to the User model
//     required: true,
//   }
author:{
    type: String,
    required: true,
},
authorId:{
  type: String

},
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [
    { text: String, author: String },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;

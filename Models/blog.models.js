import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
    type: String
   },
   img: {
    type: String,
    },
   content: {
    type: String,
    requird: true,
   },
   createdAt: {
    type: Date,
    default: Date.now
 }

})


export const Blog = mongoose.model('Blog', blogSchema) 
import { Blog } from "../Models/blog.models.js"

export const getHomePage = (req, res , next) => {
    console.log("home page")
    Blog.find().then((blogs) => {
          res.render('../views/reader/homePage', {blogs: blogs})
    }).catch(err => {
        console.log("error while fetching blog post at home page  ", err)
    })
} 
 
export const getReadBlog = (req, res, next) => {
    const blogID = req.params._id
    console.log("blog id is", blogID)
    Blog.findById(blogID).then( (blog) =>{
        res.render('../views/reader/readerPage', {blog: blog})
    })
}   
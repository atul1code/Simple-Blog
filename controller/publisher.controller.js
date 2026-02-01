import { Blog } from "../Models/blog.models.js"

export const getPublisherDashboard = (req, res, next) => {
        console.log("dashboard")
        Blog.find().then((publishedBlog) => {
            res.render('../views/publisher/dashboardPage', {publishedBlog: publishedBlog})
        })
        
}

export const getCreatePage = (req, res, next) => {
    console.log("get create post")
     res.render('../views/publisher/createPage',{editing: false})

}

export const postCreatePost = (req, res, next) => { 
    console.log("post create post")
    const {title, category, img, content,createdAt } = req.body
    const blog = new Blog({title, category, img, content, createdAt})
    blog.save().then( () => {
        console.log("blog post saved")
    }).catch(err => {
        console.log("error while saving", err)
    }).finally( () =>{
        res.redirect('/publisher/publisher-dashboard')
   })
} 

export const getEditPost = (req, res, next) => {
    const blogId = req.params._id; 
    console.log( typeof blogId)
    const editing = req.query.editing === 'true'
    
    //console.log("editing mode", editing)
    Blog.findById(blogId).then((blog) => {
         console.log("edit post and id is ", blogId)
         res.render('../views/publisher/createPage', {blog: blog, editing: editing, pageTitle: 'edit post'})
    }).catch( err => {
        console.log("error while fetching blog for edit ", err)
    })
   
} 

export const postEditPost = (req, res, next) => {
    
    const { id, title,category, img, content} =req.body

    Blog.findById(id).then( (blog) => {
        blog.title = title,
        blog.category = category,
        blog.img = img,
        blog.content = content
        blog.save().then((result) => {
            console.log("blog post updated", result);
            res.redirect('/publisher/publisher-dashboard');
        }).catch(err =>{
            console.log("error while updating the blog post ", err)
        })
    })

}

export const postDeletePost = (req, res, next) =>{
    const blogId = req.params._id;
    Blog.findOneAndDelete(blogId).then (() => {
        console.log("blog post deleted")
        res.redirect('/publisher/publisher-dashboard')
    }).catch( err => {
        console.log("error while deleting the blog post ", err)
    })
}
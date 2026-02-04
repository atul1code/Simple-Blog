import { Blog } from "../Models/blog.models.js"

export const getPublisherDashboard = async (req, res, next) => {
        const userId = req.session.user._id;
        console.log("user id is ", userId) ;
        console.log("dashboard")
        const myDashboard = await Blog.find({publisher: userId}).populate("publisher", "firstName")
       
        res.render('../views/publisher/dashboardPage', {publishedBlog: myDashboard, isLoggedIn: req.session.isLoggedIn, user: req.session.user})
        
}

export const getCreatePage = (req, res, next) => {
    console.log("get create post")
     res.render('../views/publisher/createPage',{editing: false,  isLoggedIn:  req.session.isLoggedIn})

}

export const postCreatePost = (req, res, next) => { 
    console.log("post create post")
    const {title, category,  content,createdAt ,publisher } = req.body
    console.log(req.file)

    if(!req.file){
        return res.status(400).send('No image provided')
    }

const img = "/uploads/" + req.file.filename;
    console.log("img is_ " , img)

    const blog = new Blog({title, category, img, content, createdAt, publisher: req.session.user._id})
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
    const editing = req.query.editing === 'true'
    
    Blog.findById(blogId).then((blog) => {
         console.log("edit post and id is ", blogId)
         res.render('../views/publisher/createPage', {blog: blog, editing: editing, pageTitle: 'edit post', isLoggedIn:  req.session.isLoggedIn})
    }).catch( err => {
        console.log("error while fetching blog for edit ", err)
    })
   
} 

export const postEditPost = (req, res, next) => {
    
    const { id, title,category, content} =req.body
    console.log(req.body);

    Blog.findById(id).then( (blog) => {
        blog.title = title,
        blog.category = category,
        blog.content = content
 
        if(req.file){
           if (req.file) {
              blog.img = "/uploads/" + req.file.filename;
           }

        }

        blog.save().then((result) => {
            res.redirect('/publisher/publisher-dashboard');
        }).catch(err =>{
            console.log("error while updating the blog post ", err)
        })
    })

}

export const postDeletePost = (req, res, next) =>{
    const blogId = req.params._id;
    const publisherId = req.session.user._id;
    Blog.findOneAndDelete({_id: blogId, publisher: publisherId}).then (() => {
        console.log("blog post deleted")
        res.redirect('/publisher/publisher-dashboard')
    }).catch( err => {
        console.log("error while deleting the blog post ", err)
    })
}
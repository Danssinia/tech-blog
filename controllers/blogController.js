//allBlogs, getBlogById,deleteBlog, createBlog, creatingTheBlog, updateBlogPage, updateBlog, about
//importting the model
const Blog = require('../models/blog')
const allBlogs = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('posts/index', { title: "Home Page", blogs: result })
        })
        .catch(err => {
            console.log(err)
        })
}

const createBlog = (req, res) => {
    res.render('posts/create')
}

const about = (req, res) => {
    res.render('posts/about', { title: "About TechBlog" })
}

const creatingTheBlog = (req, res) => {
    const userId = res.locals.userId;
    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body,
        userId: userId
    })
    blog.save()
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })

}

const getBlogById = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('posts/detail', { title: "Blog Detail", blog: result })
        })
        .catch(err => {
            console.log(err)
        })
}

const deleteBlog = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
}

const updateBlogPage = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('posts/update', { title: 'Update a Blog', blog: result })
        })
        .catch(err => {
            console.log(err)
        })
}

const updateBlog = (req, res) => {
    const id = req.params.id
    Blog.findByIdAndUpdate(id, {
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
}

const getLoggedInUserBlogs = (req, res) => {
    const userId = res.locals.userId;
    Blog.find({ userId: userId })
        .then(result => {
            res.render('posts/my-blogs', { title: "My Blogs", blogs: result })
        })
        .catch(err => {
            console.log(err.message)
        })
}

module.exports = {
    allBlogs,
    createBlog,
    about,
    creatingTheBlog,
    getBlogById,
    deleteBlog,
    updateBlogPage,
    updateBlog,
    getLoggedInUserBlogs
}
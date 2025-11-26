const express = require('express')
const router = express.Router()
//importing the blogController
const blogController = require('../controllers/blogController')

//importing the auth middleware
const requireAuth = require('../middleware/auth')

//just accessing the home route
router.get('/', blogController.allBlogs)

//accessing the about route
router.get('/about', blogController.about)

//getting a blog creation page
router.get('/create', requireAuth, blogController.createBlog)

//creating the blog
router.post('/blogs/create', blogController.creatingTheBlog)

//getting a single blog
router.get('/blog-detail/:id', blogController.getBlogById)

//deleting a blog
router.get('/blog-delete/:id', blogController.deleteBlog)

//update a blog page
router.get('/blog-update/:id', blogController.updateBlogPage)

//updaet post to db
router.post('/updated-blog/:id', blogController.updateBlog)

//get logged in user's blogs
router.get('/my-blogs', requireAuth, blogController.getLoggedInUserBlogs)
module.exports = router
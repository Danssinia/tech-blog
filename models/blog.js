const mongoose = require('mongoose')
const { Schema } = mongoose;

//creating the schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userId: {
        type: String
    }
}, { timestamps: true })

//Creating the model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
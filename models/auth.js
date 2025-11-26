const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator')

//creating the schema
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
}, { timestamps: true })

//creating the model
const User = mongoose.model('User', userSchema)

module.exports = User;
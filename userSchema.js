const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/blog' || 'mongodb+srv://MyFirstBlog:nxrW0Uw82nSephUo@mernapp.kinq4.mongodb.net/blog'

mongoose.connect(mongodb)

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

module.exports = mongoose.model('user', userSchema)
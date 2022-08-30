const mongoose = require('mongoose')
const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/blog'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
mongoose.connect(mongodb)

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('post', blogSchema)


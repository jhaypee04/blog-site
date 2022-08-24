const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://MyFirstBlog:nxrW0Uw82nSephUo@mernapp.kinq4.mongodb.net/blog')

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


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://MyFirstBlog:1234567abcdefg@mernapp.kinq4.mongodb.net/?retryWrites=true&w=majority')

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


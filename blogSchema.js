const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/blog')

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


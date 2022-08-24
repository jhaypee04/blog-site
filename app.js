require('dotenv').config()
const ejs = require('ejs')
const mongoose = require('mongoose')
const express = require('express')
const blogSchema = require('./blogSchema')

const app = express()
mongoose.connect('mongodb+srv://MyFirstBlog:nxrW0Uw82nSephUo@mernapp.kinq4.mongodb.net/blog')
.then(()=>{
    console.log('database connected')
   
}).catch((err)=>{
    console.log(err, "Database connection failed");
})

app.set('view engine', 'ejs')
app.use('/assets', express.static('assets'))
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res)=>{
    res.render('index')
})
app.post('/success', (req, res)=>{
    const details = req.body
    
    run()
    async function run(){
        try{
            const blogs = new blogSchema({
                name: details.username,
                title: details.title,
                body: details.body
            })
            await blogs.save()
        }
        catch(err){
            console.log(err.message)
        }
    }

    res.render('success')
    
})
app.get('/blogs', async (req, res)=>{
    const allPosts = await blogSchema.find()

    res.render('blogs', {posts: allPosts})
})
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`App started on port 3000 ${port}`);
})
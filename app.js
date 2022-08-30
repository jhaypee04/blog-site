require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const express = require('express')
const blogSchema = require('./blogSchema')
const userSchema = require('./userSchema')

const secretKey = 'myfirstblog'


const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/blog' || 'mongodb+srv://MyFirstBlog:nxrW0Uw82nSephUo@mernapp.kinq4.mongodb.net/blog'

mongoose.connect(mongodb)
.then(()=>{
    console.log('database connected')
    
}).catch((err)=>{
    console.log(err, "Database connection failed");
})

const app = express()

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use('/assets', express.static('assets'))
app.use(express.urlencoded({extended: true}));

// login in a user
app.post('/login', async (req, res)=>{
    const loginInfo = req.body
    const email = loginInfo.email
    const password = loginInfo.password

    // console.log('form password: ', password)

    userSchema.findOne({email})
    .then((user)=>{
        // console.log("database password: ", user.password)
        bcrypt.compare(password, user.password, async (err, data)=>{
            if(err){
                console.log(err);
            }else{
                // console.log(data)

                const payload = {
                    user: {
                        email: user.email
                    }
                }
    
            
                const token = await jwt.sign(payload, secretKey, {
                    expiresIn: '3600s'
                })
    
                res.cookie('token',token, {
                    // when hosting change to true
                    httpOnly: false
                })

                res.redirect('/addBlogs')

            }
        })


    }).catch((err)=>{
        console.log(err)
    })





})

// register a user
app.post('/register', async (req, res)=>{
    const registrationInfo = req.body
    const password = registrationInfo.password
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    registerUser()
    async function registerUser(){
        try{
            const user = new userSchema({
                username: registrationInfo.username,
                email: registrationInfo.email,
                password: hashedPassword
            })
            await user.save()

            const payload = {
                user: {
                    email: registrationInfo.email
                }
            }

            
            const token = await jwt.sign(payload, secretKey, {
                expiresIn: '3600s'
            })

            res.cookie('token',token, {
                // when hosting change to true
                httpOnly: false
            })
            res.redirect('/login')


        }
        catch(err){
            console.log(err.message)
        }

    }
    // res.render('blogs)
})

// save a post
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
// Home route
app.get('/', async (req, res)=>{
    const allPosts = await blogSchema.find()

    res.render('index', {posts: allPosts})
})

// Register Route
app.get('/register', (req, res)=>{
    res.render('register')
})

// Login Route
app.get('/login', (req, res)=>{
    res.render('login')
})

// Log out Route
app.get('/logout', (req, res)=>{
    res.clearCookie('token')
    res.redirect('/login')
})

// AddBlog Route
app.get('/addBlogs', protectRoute, async (req, res)=>{
    const user = req.user.user.email;
    const aUser = await userSchema.findOne({email: user})
    // console.log(aUser)

    res.render('addBlogs', {username: aUser.username})
})

function protectRoute(req, res, next){
    const token = req.cookies.token
    try{
        const user = jwt.verify(token, secretKey)

        req.user = user
        // console.log(req.user)
        next()
    }
    catch(err){
        res.clearCookie('token')
        return res.redirect('/')
    }
}

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`App started on port 3000 ${port}`);
})
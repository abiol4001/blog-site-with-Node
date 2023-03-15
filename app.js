const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
require('dotenv').config();


const app = express()

const user = process.env.USERNAME
const pass = process.env.PASSWORD
// connect to mongodb
const dbURI =
  `mongodb+srv://${user}:${pass}@nodetuts.zrzd40b.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURI)
    .then(result => {
        app.listen(3000, () => {
          console.log("Server running on port 3000");
        });
    })
    .catch(err => console.log(err))

// middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// register view engine
app.set("view engine", "ejs")



app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then(result => {
            res.render('index', {title: "Blogs", blogs: result})
        })
        .catch(err => console.log(err))
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then(result => {
            res.redirect('/blogs')
        })
})




// routes
app.get('/', function(req, res) {
    res.redirect('/blogs')
    // res.render('index', {title: "Home", blogs}) 
})

app.get('/about', function(req, res) {
    res.render('about', {title: 'About'})
})

app.get('/blogs/create', function(req, res) {
    res.render('create', {title: 'Create a new Post'})
})

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("detail", { title: "Blog Details", blog: result });
    })
    .catch((err) => console.log(err));
});
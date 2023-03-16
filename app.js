const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes')
require("dotenv").config();

// express app
const app = express();

const user = process.env.USERNAME;
const pass = process.env.PASSWORD;
// connect to mongodb
const dbURI = `mongodb+srv://${user}:${pass}@nodetuts.zrzd40b.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => console.log(err));

// middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/blogs", blogRoutes);

// register view engine
app.set("view engine", "ejs");


// routes

app.get("/", function (req, res) {
  res.redirect("/blogs");
  // res.render('index', {title: "Home", blogs})
});

app.get("/about", function (req, res) {
  res.render("about", { title: "About" });
});



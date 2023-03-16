const express = require('express')
const Blog = require("../models/blog");
const blogController = require('../controllers/blogController')
const router = express.Router()

const { blog_index, blog_delete, blog_details, blog_create_get, blog_create_post } =
  blogController;


router.get("/", blog_index);

router.post("/", blog_create_post);

router.get("/create", blog_create_get);

router.get("/:id", blog_details);

router.delete("/:id", blog_delete);

module.exports = router
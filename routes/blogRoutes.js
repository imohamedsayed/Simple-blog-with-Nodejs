const express = require("express");
const router = express.Router();

const BlogController = require("../controllers/BlogController");

router.get("/blog/create", BlogController.blog_create_get);

// create a blog document
router.post("/blog/create", BlogController.blog_create_post);

// Single blogs
router.get("/blog/:id", BlogController.single_blog_get);

// delete a blog

router.delete("/blog/:id", BlogController.blog_delete);

// app.post("/blog/search", (req, res) => {
//   Blog.find({ title: req.body["search"] })
//     .then((results) => {
//       blogs = results;
//       res.render("index", { title: "Home", blogs });
//     })
//     .catch((err) => console.log("Error while getting blogs: ", err));
// });

module.exports = router;

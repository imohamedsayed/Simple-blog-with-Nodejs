const Blog = require("../models/blog");

const single_blog_get = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((results) => {
      console.log(results);
      res.render("blog_view", { title: "Blog Details", blog: results });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Blog not found" });
    });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create Blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog({
    title: req.body.blog_title,
    snippet: req.body.snippet,
    body: req.body.body,
  });
  blog
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => res.send(err));
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      // send res to browser (JSON data)
      res.json({ redirect: "/" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_create_get,
  single_blog_get,
  blog_create_post,
  blog_delete,
};

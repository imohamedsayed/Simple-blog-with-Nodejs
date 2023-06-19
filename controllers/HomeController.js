const Blog = require("../models/blog");

const index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((results) => {
      res.render("index", { blogs: results, title: "Home Page" });
    })
    .catch((err) => console.error(err));
};

module.exports = {
  index,
};

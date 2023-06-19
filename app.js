const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Models

const Blog = require("./models/blog");

// express app
const app = express();

/* 
  ---- Database configurations
*/
const dbURI =
  "mongodb+srv://MSO:mso123456@node.d5zfykw.mongodb.net/Node-tutorial?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(3000); // we don't want to listen to requests until db connection is complete ..
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

/* 
  ---- Template engine 
*/

app.set("view engine", "ejs");

/* 
  ---- Add bootstrap
*/

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

/* 
  ---- middleware & static files
*/

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* 
  ---- basic Routes
*/

app.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((results) => {
      res.render("index", { title: "Home", blogs: results });
    })
    .catch((err) => console.log("Error while getting blogs: ", err));
});

// app.post("/search", (req, res) => {
//   Blog.find({ title: req.body["search"] })
//     .then((results) => {
//       blogs = results;
//       res.render("index", { title: "Home", blogs });
//     })
//     .catch((err) => console.log("Error while getting blogs: ", err));
// });

/* 
  ---- Blog Routes
*/

app.get("/blog/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

// Single blogs
app.get("/blog/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((results) => {
      console.log(results);
      res.render("blog_view", { title: "Blog Details", blog: results });
    })
    .catch((err) => console.log(err));
});

// delete a blog

app.delete("/blog/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      // send res to browser (JSON data)
      res.json({ redirect: "/" });
    })
    .catch((err) => console.log(err));
});

// create a blog document
app.post("/blog/create", (req, res) => {
  // console.log(req.body);
  const blog = new Blog({
    title: req.body.blog_title,
    snippet: req.body.snippet,
    body: req.body.body,
  });
  blog
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => res.send(err));
});

/* 
  ---- 404 - not found
*/
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

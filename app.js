const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogRoutes");
const homeRouter = require("./routes/homeRouters");
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

app.use(homeRouter);

/* 
  ---- Blog Routes
*/
app.use(blogRouter);
/* 
  ---- 404 - not found
*/
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }));
app.set("view engin", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

app.listen(port, () => {
    console.log(`App is listiening on port ${port}`);
});

let posts = [
    {
        id:uuidv4(),
        username: "apnacollage",
        content: "I Love Coding",
        password:"1234"
    },
    {
        id:uuidv4(),
        username: "Code_Wirh_Harry",
        content: "I Do Coding",
        password:"1234"
    }
];
//View all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts});
});
//add new posts
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/posts", (req, res) => {
    let { username, content,password } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content,password });
    res.redirect("http://localhost:8080/posts/");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => (id) === p.id);
    res.render("show.ejs", { post });
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let newContent  = req.body.content;
    let post = posts.find((p) => (id) === p.id);
    let { pass } = req.body;
    if (post.password == pass) {
        post.content = newContent;
        res.redirect("http://localhost:8080/posts/");
    } else {
        res.render("passError.ejs",{post});
    }
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => (id) === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => (id) === p.id);
    let { pass } = req.body;
    if (post.password == pass) {
        posts = posts.filter((p) => (id) !== p.id);
        res.redirect("/posts");
    } else {
        res.render("passError.ejs",{post});
    }
})

app.get("/posts/:id/delete", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => (id) === p.id);
    res.render("delete.ejs", { post });
});

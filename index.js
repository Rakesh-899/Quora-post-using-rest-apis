const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4: uuidv4}=require('uuid');
const methodOverride=require("method-override");
// uuidv4();
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
let posts=[
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "Rakesh swami",
        content: "I also love coding"
    },
    {
        id: uuidv4(),
        username: "Srishti choudhary",
        content: "I alos love coding with Rakesh"
    }
];
app.get("/posts", (req, res) => {
    // res.send("server working well!");
    res.render("index.ejs", {posts});
})
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})
app.post("/posts", (req, res) => {
    // console.log(req.body);
    let {username, content}=req.body;
    let id=uuidv4();
    posts.push({id, username, content});
    // res.send("post request working");
    res.redirect("/posts");
})
app.get("/posts/:id", (req, res) => {
    let {id}=req.params;
    let post=posts.find((p) => id===p.id);
    console.log(post);
    res.render("show.ejs", {post});
    res.send("request working properly");
})
app.patch("/posts/:id", (req, res) => {
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p) => id==p.id);
    post.content=newcontent;
    // res.send("patch request working properly !");
    res.redirect("/posts");
})
app.get("/posts/:id/edit", (req, res) => {
    let {id}=req.params;
    let post=posts.find((p) => id===p.id);
    res.render("edit.ejs", {post});
})
app.get("/", (req, res) => {
    res.send("server working well!");
})
app.delete("/post/:id", (req, res) => {
    let {id}=req.params;
    posts=posts.filter((p) => id!=p.id);
    res.redirect("/posts");
})
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.listen(port, () => {
    console.log("Listening to the port : 8080");
});

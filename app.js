const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Sed cras ornare arcu dui vivamus arcu. Sagittis vitae et leo duis ut diam quam. Morbi leo urna molestie at elementum. Hendrerit gravida rutrum quisque non tellus orci ac auctor. Donec ultrices tincidunt arcu non sodales. Elementum tempus egestas sed sed risus pretium quam. Eu sem integer vitae justo. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Urna condimentum mattis pellentesque id. Habitant morbi tristique senectus et netus et.";
const contacContent = "Velit egestas dui id ornare arcu odio ut. Cursus sit amet dictum sit amet justo donec enim. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Accumsan sit amet nulla facilisi morbi tempus iaculis. Proin sagittis nisl rhoncus mattis rhoncus. Donec adipiscing tristique risus nec feugiat in. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices eros. Congue eu consequat ac felis donec et odio pellentesque. Semper eget duis at tellus at urna condimentum mattis pellentesque. Placerat duis ultricies lacus sed turpis tincidunt id. Non diam phasellus vestibulum lorem sed risus ultricies tristique.";
const posts = [];
//--------------------------------

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//---------------------------------

app.get("/",function(req, res){
    res.render("home", {
        startingContent: homeStartingContent,
        Posts: posts
    });
    // console.log(posts);

});
app.get("/about",function(req,res){
    res.render("about", {about: aboutContent});
});
app.get("/contact" , function(req,res){
    res.render("contact",{contact: contacContent});
});
app.get("/compose", function(req, res){
    res.render("compose");
});
app.post("/compose", function(req,res){
    // console.log(req.body.postTitle);console.log(req.body.postBody);
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post);

    res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
    // console.log(req.params.postName);
    const requestedTitle = _.lowerCase(req.params.postName);
    posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title);
        if (requestedTitle === storedTitle){
            res.render("posts", {
                title: post.title,
                content: post.content
            });
        }
        else{
            console.log("no");
        }
            
    });
    
});
// --------------------------------

app.listen(3000,function(){
    console.log("Server started at port 3000.");
});
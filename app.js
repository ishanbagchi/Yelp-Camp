const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Chamurchi", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547940752c7cd49f45_340.jpg"},
    {name: "Gorumara", image: "https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"},
    {name: "Nathua", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2f78d39745cd_340.jpg"}
]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new")
});

app.listen(process.env.PORT || 3000, process.env.ID, function(){
    console.log("Your app is running in 'https://yelpcamp-akkjg.run-ap-south1.goorm.io/'");
});
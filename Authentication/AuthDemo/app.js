var express = require("express");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/auth_demo", 
				 {useNewUrlParser: true, 
				  useUnifiedTopology: true});

var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("home");
});

app.get("/secret", function(req, res){
	res.render("secret");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Your app is running in 'https://yelpcamp-akkjg.run-ap-south1.goorm.io/'");
});
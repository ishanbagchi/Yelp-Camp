var express               = require("express"),
	mongoose              = require("mongoose"),
	passport              = require("passport"),
	bodyParser            = require("body-parser"),
	localStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	User                  = require("./models/user");

mongoose.connect("mongodb://localhost:27017/auth_demo", 
				 {useNewUrlParser: true, 
				  useUnifiedTopology: true});

var app = express();
app.set("view engine", "ejs");
app.use(require("express-session")({
	secret:"Rusty is the best and cutest dog in the world",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
	res.render("home");
});

app.get("/secret", function(req, res){
	res.render("secret");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Your app is running in 'https://yelpcamp-akkjg.run-ap-south1.goorm.io/'");
});
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
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
	secret:"Rusty is the best and cutest dog in the world",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===================
// ROUTES
//===================

app.get("/", function(req, res){
	res.render("home");
});

app.get("/secret", function(req, res){
	res.render("secret");
});

// Auth Routes
app.get("/register", function(req, res){
	res.render("register");
});

// Handling user signup
app.post("/register", function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	});
});

// LOGIN ROUTES
// Render login form
app.get("/login", function(req, res){
	res.render("login");
});

// Login logic
// =>middleware
app.post("/login",passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/register"
}) , function(req, res){
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Your app is running in 'https://yelpcamp-akkjg.run-ap-south1.goorm.io/'");
});
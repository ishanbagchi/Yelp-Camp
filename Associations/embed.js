const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelpcamp", 
				 {useNewUrlParser: true, 
				  useUnifiedTopology: true});

// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
// 	email: "pottrharry@gmail.com",
// 	name: "Harry Potter"
// });

// newUser.posts.push({
// 	title: "How to bru polyjuce potion",
// 	content: "Just kidding. Go to potions class to learn it!"
// });

// newUser.save(function(err, user){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "Reflections on apples",
// 	content: "They are delicious"
// });

// newPost.save(function(err, post){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

User.findOne({name: "Harry Potter"}, function(err, user){
	if(err) {
		console.log(err);
	} else {
		//console.log(user);
		user.posts.push({
			title: "3 things I really hate!",
			content: "Voldemort, Voldemort and Voldemort."
		});
		user.save(function(err, user){
			if(err) {
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", 
				 {useNewUrlParser: true, 
				  useUnifiedTopology: true});

var Post = require("./models/post");
var User = require("./models/user");

Post.create({
	title: "Can I cook?",
	content: "Only a cup of tea."
}, function(err, post){
	if(err) {
		console.log(err);
	} else {
		User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
			if(err) {
				console.log(err);
			} else {
				foundUser.posts.push(post);
				foundUser.save(function(err, data){
					if(err) {
						console.log(err);
					} else {
						console.log(data);
					}
				});
			}
		});
	}
});

// Find user
// find all post for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });



// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Bulcher"
// });
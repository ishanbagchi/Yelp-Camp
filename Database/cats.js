const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// adding a new cat to mongodb

// var george = new Cat({
// 	name: "George",
// 	age: "11",
// 	temperament: "Grouchy"
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("Something went wrong!");
// 	} else {
// 		console.log("Saved a cat.");
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: "Snowy",
	age: 15,
	temprament: "Bland"
}, function(err, cat){
	if(err){
		console.log(err);
	} else {
		console.log("Add a cat!");
		console.log(cat);
	}
});

Cat.find({}, function(err, cats){
	if(err){
		console.log("Oops!");
		console.log(err);
	} else {
		console.log("ALLTHE CATS!");
		console.log(cats);
	}
});
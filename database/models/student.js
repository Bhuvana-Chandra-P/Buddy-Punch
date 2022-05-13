const mongoose = require('mongoose');

module.exports = mongoose.model(
	'Student',
	new mongoose.Schema({
		name: String, 
		rollNo: Number,
		password: String,
        email:String,
		image: String, 
		
	})
);
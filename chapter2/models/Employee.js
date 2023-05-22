const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
	_id:  mongoose.Types.ObjectId,
	name: String,
	designation: String,
	email: {
		type: String,
		unique: true
	},
	phone: String,
	age: Number,
	avatar: String

},
	{ timestamps: true });



module.exports = mongoose.model('Employee', employeeSchema);

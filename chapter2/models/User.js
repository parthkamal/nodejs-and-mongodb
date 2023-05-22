const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	_id:  mongoose.Types.ObjectId,
	name: String,
	email: {
		type: String,
		unique: true
	},
	phone: String,
	password: String,

},
	{ timestamps: true });



module.exports = mongoose.model('User', userSchema);

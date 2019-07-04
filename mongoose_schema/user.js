var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
	username: {type: String, unique: true},
	first_name: {type: String, min: 1, max: 50},
	last_name: {type: String, min: 1, max: 50},
	password: String,
	email_id: {type: String, unique: true},
	mob_number: String
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', userSchema);
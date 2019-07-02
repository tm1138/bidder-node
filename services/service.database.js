//This code requires mongoose node module
//testing git

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var userProfile = {
	user: "dbadmin",
	pass: "password"
};

var connectionString = 'mongodb://' + userProfile.user + ':' + userProfile.pass +'@127.0.0.1:27017/userdb?authSource=admin';

var userSchema = new Schema({
	first_name: {type: String, min: 1, max: 50},
	last_name: {type: String, min: 1, max: 50},
	password: String,
	email_id: {type: String, unique: true},
	mob_number: String
});
userSchema.plugin(uniqueValidator);
var userModel = mongoose.model('users', userSchema);  //'users' is the collection name in the db


class DataService
{
	DataService()
	{
		console.log('data service object created..');
	}

	Init()
	{
		mongoose.connect(connectionString, {
			useNewUrlParser: true
		})
		.then(() => 
		{
			console.log('Connected to mongoDb.....');
		
		})
		.catch(err => console.error('Could not connect to mongoDb', err));
	}

	CreateUser(data)
	{
		var users = new userModel({
			first_name: data.first_name,
			last_name: data.last_name,
			password: data.password,
			email_id: data.email_id,
			mob_number: data.mob_number
		});
		users.save((saveErr, savedUser) => {
			if (saveErr)
			{
				console.error('error saving document', saveErr);
			}
			else
			{
				console.log('user created', savedUser);
			}
		});
	}
}

module.exports = new DataService();
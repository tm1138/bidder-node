
var mongoose = require('mongoose');


var userModel = require('./../mongoose_schema/user');  //'users' is the collection name in the db


class DataService
{
	constructor(connectionString)
	{
		this.connectionString = connectionString;
		console.log('dataservice object created');
	}

	Init()
	{
		mongoose.connect(this.connectionString, {
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
			username: data.username,
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
			return 
		});
	}

	ReadUser()
	{
		userModel.find({})
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.error(err);
			})
	}

	
}

module.exports = DataService;
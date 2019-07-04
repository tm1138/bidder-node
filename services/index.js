var DataService = require('./service.database');

var userProfile = {
	user: "dbadmin",
	pass: "password"
};

var connectionString = 'mongodb://' + userProfile.user + ':' + userProfile.pass +'@127.0.0.1:27017/userdb?authSource=admin';

var dataService = new DataService(connectionString);
dataService.Init();

var data = {
    username: 'john123',
    first_name: 'john',
    last_name: 'sdfkj',
    password: 'asbfsdf',
    email_id: 'asdfg@gmail.com',
    mobile_number: '1234'
};

//dataService.CreateUser(data);

dataService.ReadUser();
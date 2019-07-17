var DataService = require('./service.database');

var userProfile = {
	user: "dbadmin",
	pass: "password"
};

var connectionString = 'mongodb://' + userProfile.user + ':' + userProfile.pass +'@127.0.0.1:27017/userdb?authSource=admin';

var dataService = new DataService(connectionString);
//dataService.Init();

var data = {
    username: 'tony123',
    first_name: 'tony',
    last_name: 'sdfkj',
    password: 'asbfsdf',
    email_id: 'tonydfs@gmail.com',
    mobile_number: '1234569854'
};

dataService.CreateUser(data);

//dataService.ReadAllUser();

//console.log(allUsers);
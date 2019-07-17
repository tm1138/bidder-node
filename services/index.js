var DataService = require('./service.database');

var userProfile = {
	user: "dbadmin",
	pass: "password"
};

var connectionString = 'mongodb://' + userProfile.user + ':' + userProfile.pass +'@127.0.0.1:27017/userdb?authSource=admin';

var dataService = new DataService(connectionString);
dataService.Init();

var data = {
    username: 'jony123',
    first_name: 'jony',
    last_name: 'jonuse',
    password: 'asbfsdfasas',
    email_id: 'jony@gmail.com',
    mob_number: '3334569854'
};

//dataService.CreateUser(data);

/*dataService.ReadAllUser().exec()
.then(data => {
    console.log(data);
})
.catch(err => {
    console.error(err);
})*/

//dataService.ReadAllUser();

//console.log(allUsers);
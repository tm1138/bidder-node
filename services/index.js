var dataService = require('./service.database');

dataService.Init();

var data = {
    first_name: 'john',
    last_name: 'sdfkj',
    password: 'asbfsdf',
    email_id: 'asdfg@gmail.com',
    mobile_number: '1234'
};

dataService.CreateUser(data);
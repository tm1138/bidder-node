class CustomerModel
{
	constructor(uid, first_name, last_name, email, mobile_number, password)
	{
		this.uid = uid;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.mobile_number = mobile_number;
		this.password = password;
	}
}

module.exports = CustomerModel;
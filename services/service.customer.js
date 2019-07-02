const CustomerModel = require("../models/model.customer");
var validator = require('fastest-validator');

let customers = {};
let counter = 0;

let customerValidator = new validator();

let namePattern = /([A-Za-z\-\’])*/;
let mobileNumberPattern = /[0-9]{10}/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

const customerVSchema = {
                        guid: {type: "string", min: 3},

                        first_name: {type: "string", min: 1, max: 50, pattern: namePattern},
                        last_name: {type: "string", min: 1, max: 50, pattern: namePattern},
                        email: {type: "email", max: 75},
                        mobile_number: {type: "string", pattern: mobileNumberPattern},

                        password: {type: "string", min: 2, max: 50, pattern: passwordPattern}
                    };

class CustomerService
{

	//created customer if validation is successfull
    static createCustomer(data)
    {
        var vres = customerValidator.validate(data, customerVSchema);

        if(!(vres == true))
        {
            let errors = {}, item;

            for (const index in vres)
            {
                item = vres[index];
                errors[item.fiels] = item.message;
            }

            throw {
                name: "ValidationError",
                message: errors
            };
        }

        let customer = new CustomerModel(data.first_name, data.last_name, data.email, data.mobile_number, data.password);
        customer.uid = 'c' + counter++;
        customers[customer.uid] = customer;
        return customer;
    }

    static retrieve(uid)
	{
		if(customers[uid] != null)
		{
			return customers[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ uid +')');
		}
	}

	static update(uid, data)
	{
		if(customers[uid] != null)
		{
			const customer = customers[uid];
			
			Object.assign(customer, data);
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
		}
	}

	static delete(uid)
	{
		if(customers[uid] != null)
		{
			delete customers[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
		}
	}
}

module.exports = CustomerService;
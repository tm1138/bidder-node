const CustomerModel = require("../models/model.customer");

var validateCustomer = require('./service.validation').ValidateCustomer;

var handleError = require('../services/service.validation').HandleError;

let customers = {};
let counter = 0;


class CustomerService
{

	//created customer if validation is successfull
    static createCustomer(data)
    {
        var validationResponse = validateCustomer(data);

        if(validationResponse != true)
        {
            handleError(validationResponse);
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
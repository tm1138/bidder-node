var validator = require('fastest-validator');
let v = new validator();

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

function handleError(err)
{
    let errors = [], item;
    for (const index in err)
    {
        item = err[index];
        errors.push({
            field: item.field,
            message: item.message
        });
    }

    throw {
        name: "ValidationError",
        message: errors
    };
}

module.exports.ValidateCustomer = v.compile(customerVSchema);

module.exports.HandleError = handleError;
var express = require('express');
var router = express.Router();

var customerService = require('../services/service.customer')


/* GET customer listing. */
router.get('/', async function(req, res, next)
{
	res.json({error: "Invalid Customer UID."});
});

/* adds a new customer to the list */
router.post('/', async (req, res, next) =>
{
  const body = req.body;
  
  try
  {
    const customer = await customerService.create(body);

    if (body.guid != null)
    {
      customer.guid = body.guid;
    }
    
    res.cookie('guid', customer.guid, { maxAge: 900000, httpOnly: true});

    return res.status(201).json({ customer: customer });
  }

  catch(err)
  {
    if (err.name === "validationError")
    {
      return res.status(400).json({ error: err.message });
    }

    //unexpected error
    return next(err);
  }
});

/* retrieves a customer by uid */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const customer = await customerService.retrieve(req.params.id);

		return res.json({ customer: customer });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the customer by uid */
router.put('/:id', async (req, res, next) =>
{
	try
	{
		const customer = await CustomerService.update(req.params.id, req.body);

		return res.json({ customer: customer });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the customer from the customer list by uid */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const customer = await CustomerService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;

module.exports = router;

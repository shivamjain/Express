const express = require('express');
const router = express.Router();
var products = require('../Products.js'); // importing products array from products.js
const uuid = require('uuid'); // generate universal id ('npm install uuid')

//Get All Products
router.get('/', (req, res) => {
	res.json(products);
});

//Get Single Member : Fetch id and show product with that same id
router.get('/:id', (req, res) => {
	const id = req.params.id;
	const found = products.some((product) => (parseInt(id) === product.id));

	if(found){
		res.json(products.filter((product)=>{
			return parseInt(id) === product.id;
		}));
	}else{
		res.status(400).json({msg:`No Product found with id ${id}`});
	}
	
});

//Create Product
router.post('/', (req, res) => {
	//res.send(req.body);
	const newProduct = {
		id: uuid.v4(),
		name: req.body.name,
		type: req.body.type,
		status: 'active'
	}

	if(!req.body.name || !req.body.type){
		return res.status(400).send({msg:"Please enter name and type of product."})
	}
	products.push(newProduct);
	res.json(products);
	// res.redirect('/');
});

//Update Product
router.put('/:id', (req, res) => {
	const id = req.params.id;
	const found = products.some((product) => (parseInt(id) === product.id));

	if(found){
		const updProduct = req.body;
		products.forEach((product) => {
			if(product.id === parseInt(id)){
				product.name = updProduct.name ? updProduct.name : product.name;
				product.type = updProduct.type ? updProduct.type : product.type;

				res.json({msg:"Member Updated", product});
			}
		});
	}else{
		res.status(400).json({msg:`No Product found with id ${id}`});
	}
	
});

//Delete Product
router.delete('/:id',(req, res) => {
	const id = req.params.id;
	const found = products.some((product) => (parseInt(id) === product.id));
	if(found){
		products = products.filter((product) => product.id !== parseInt(id));
		res.json({
			msg: "Product Deleted",
			products: products
		});
	}else{
		res.status(400).json({msg:`No Product found with id ${id}`});
	}

});

module.exports = router;
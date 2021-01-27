const express = require('express');
const router = express.Router();

//Query Method
router.get('/', (req, res) =>{
	const id = req.query.id;
	res.send('Hello alien...'+ id);
});

//Parameter Method
router.get('/:id', (req, res) =>{
	const id = req.params.id;
	res.send('Hey alien...'+id);
});

module.exports = router;
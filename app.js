const express = require('express'); //express module
const app = express(); //run express
const path = require('path'); //path module
const exphbs = require('express-handlebars');

const logger = require('./middleware/logger.js');
const products = require('./Products.js');

//Initialize logger middlewre
//app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); 

//Body Parser Middleware
app.use(express.json()); //handle raw json
app.use(express.urlencoded({extended: false})); //handle form submission

//Render index.handlebars on root
app.get('/', (req, res) => {
	res.render('index',{
		title: 'Products list',
		products
	});
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Alien Routes
app.use('/alien', require('./routes/alien.js'));

//Products API Routes
app.use('/products', require('./routes/products.js'));

//
app.use('/signup', require('./routes/signup.js'));
//listening on port 9000
const PORT = 9000;
app.listen(PORT, (req, res) =>{		
	console.log(`Server running on port ${PORT}`);
});


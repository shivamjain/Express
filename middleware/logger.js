const moment = require('moment'); //moment(Date) module -> npm install moment

//Middleware logger function
const logger = (req, res, next) => {
	//console.log('Hello');
	console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
	//console.log(Date());
	console.log(moment().format());
	next();
}

module.exports = logger;
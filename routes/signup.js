const express = require('express');
const router = express.Router();
var users = [];

const sqlite3 = require('sqlite3').verbose();
// open database in memory(:memory:) or add path of db
let db = new sqlite3.Database('../user.db', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the SQlite database.');
});
//Show all users
router.get('/', (req, res) => {
	db.serialize(() => {
		db.all('Select * from userinfo', [], (err, rows) => {
			if (err) {
				console.error(err.message);
			}
			rows.forEach((row) => {
				users.push(row);
			});
		});
	})
	
	res.render('signup',{
		title: "Signup",
		users
	})

	users = [];
});

//New User Signup
router.post('/', (req, res) => {
	
	if(!req.body.name || !req.body.password){
		return res.status(400).send({msg:"Please enter name and password to signup"});
	}
	db.serialize(() => {
		db.run(`INSERT INTO userinfo(name,password,role) 
			VALUES(?,?,?)`, [req.body.name, req.body.password, 'user'], (err) => {
				if (err) {
					return console.log(err.message);
				}
			});
	});
});

module.exports = router;
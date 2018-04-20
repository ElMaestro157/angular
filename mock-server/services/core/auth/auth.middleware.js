const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

  // Matching login and password and returning token, if matches
	router.post('/auth/login', (req, res, next) => {
		let users = server.db.getState().users,
			matchedUser = users.find((user) => {
				return user.login.toUpperCase() === req.body.login.toUpperCase();
			});

		if(!matchedUser) {
			res.status(401).send('Wrong username');
		} else if(matchedUser.password === req.body.password) {
			res.json({ token: matchedUser.fakeToken});
		} else {
			res.status(401).send("Wrong password");
		}
	});

  // Getting user's info on token
	router.post('/auth/userInfo', (req, res, next) => {
		let users = server.db.getState().users,
			matchedUser = users.find((user) => {
				return user.fakeToken === req.header('Authorization');
			});

		if(!matchedUser) {
			res.status(401).send('Unauthorized');
		} else {
			res.json(matchedUser);
		}
	});

	return router;
};

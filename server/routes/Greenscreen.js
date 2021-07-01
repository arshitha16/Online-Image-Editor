//Greensscreen
//new
const User = require("../models/user");
const passport = require("passport");
const route = require('express').Router()
route.get('/',async (req, res) => {
		if (req.isAuthenticated()) {
		res.render('Greenscreen/new');
	}
	else{
		res.render('login');	
	}
});
module.exports = route;
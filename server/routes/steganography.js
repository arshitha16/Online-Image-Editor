//Steganography
//new
const User = require("../models/user");
const passport = require("passport");
const route = require('express').Router()
route.get('/',async (req, res) => {
		if (req.isAuthenticated()) {
		res.render('steganography/image');
	}
	else{
		res.render('login');	
	}
});
route.get('/text',async (req,res ) => {
	if (req.isAuthenticated()) {
	res.render('steganography/text');
	}else{
		res.render('login');
	}
});

module.exports = route;

const Joi = require('Joi');
const PasswordComplexity = require('joi-password-complexity');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const route = express.Router();

route.post('/', async (req, res) => {
    
    if(result = validate(req.body)) return res.send(result.details[0].message);

    const user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    //Authenticate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();

    res.send(token);
    res.end();
 });

 function validate(user){
    const schema = {
        email: Joi.string().required(),
        password: new PasswordComplexity()
    }
    const result = Joi.validate(user, schema);
    if(result.error){
        return result.error;
    }  
 }

 module.exports = route;
const authorization = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate} = require('../models/user');
const express = require('express');
const route = express.Router();


//Get
route.get('/me', authorization, async (req, res) => {

    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
    res.end();

 });

 //Delete
 route.delete('/:id', async (req, res) => {

    const user = await User.findByIdAndRemove({ _id : req.params.id});
    if(!user) return res.status(404).send('Not found');
    res.send(user);
    res.end();
 });

 //Post
 route.post('/', async (req, res) => {
    
    if(result = validate(req.body)) return res.send(result.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('User already exist');
    
    user = new User(_.pick(req.body, ['name', 'email', 'password', 'roles']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save()

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    res.end();
 });

 //Put 
 route.put('/:id', async (req, res) => {
    
    //if(result = validate(req.body)) return res.send(result.details[0].message);

    const user = await User.find({ _id : req.params.id})
    if(user.length === 0) return res.status(404).send('Wrong ID Entered');    

    const newUser = await User.findByIdAndUpdate( 
        {_id : req.params.id} , { $set : { password: req.body.password}}, 
        {new: true} );

    res.send(newUser);
    res.end();
 });

 module.exports = route;
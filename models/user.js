const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5
    },
    roles: {
        isAdmin: Boolean,
        isDeveloper: Boolean
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, roles: this.roles}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validation(user){

    const schema = {
        name: Joi.string().min(4).max(50).required(),
        email: Joi.string().required(),
        password: new PasswordComplexity(),
        roles: Joi.object()
    }
    const result = Joi.validate(user, schema);
    if(result.error){

        return result.error;
    }
        
 }

 module.exports.User = User;
 module.exports.validate = validation;
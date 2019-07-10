const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports = mongoose.model("User", new mongoose.Schema({
    firstname: {
        type: String,
        minlength: 30,
        maxlength: 60,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        minlength: 30,
        maxlength: 60,
        required: true,
        trim: true
    },
    username: {
        type: String,
        minlength: 8,
        maxlength: 60,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 30,
        required: true,
        unique: true,
        trim: true
    },
    role: ["superadmin", "admin", "company representative"],
    isVerified: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number,
        minlength: 11,
        maxlength: 15,
        required: true,
        trim: true
    }
}));

module.exports.validate = (user) => {
    let userSchema = {
        firstname:  Joi.string().min(30).max(60).required(),
        lastname:   Joi.string().min(30).max(60).required(),
        username:   Joi.string().min(8).max(30).required(),
        password:   Joi.string().min(8).max(30).required(),
        phone:      Joi.string().min(11).max(15).required()
    }
    return Joi.validate(user, userSchema)
}
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minlength: 2,
        maxlength: 60,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        minlength: 2,
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
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["superadmin", "admin", "company representative"],
        default: "company representative"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        trim: true
    }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(10), null);
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.password)
}

module.exports.validate = (user) => {
    let userSchema = {
        firstname:  Joi.string().min(2).max(60).required(),
        lastname:   Joi.string().min(2).max(60).required(),
        username:   Joi.string().min(8).max(30).required(),
        password:   Joi.string().min(8).required(),
        phone:      Joi.string().required()
    }
    return Joi.validate(user, userSchema)
}

module.exports.User = mongoose.model("User", UserSchema);
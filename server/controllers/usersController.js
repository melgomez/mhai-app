const {User, validate} = require('../models/user');
// const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

exports.index = async (req, res) => {
    let users = await User.find();
    res.send(users)
}
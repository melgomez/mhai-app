const express = require('express');
const error = require('../../server/middleware/error');
const userRoutes = require('../routes/userRoutes');


module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/user', userRoutes);
}
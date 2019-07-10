const express = require('express');
const error = require('../../server/middleware/error');

module.exports = (app) => {
    app.use(express.json());
    app.use(error);
}
const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Root Path');
});

routes.use('/signup', require('./signupController'));

module.exports = routes;
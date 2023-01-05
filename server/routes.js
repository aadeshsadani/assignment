const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = (req, resp, next)=>{
    const token = req.headers.authorization;
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) =>{
            if(err){
                resp.status(401).send(`Token expire`);
            }else{
                next();
            }
        });
}

routes.use('/login', require('./loginController'));
routes.use('/signup', require('./signupController'));
routes.use('/todo' , auth, require('./todoController'));

module.exports = routes;
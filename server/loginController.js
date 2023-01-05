const express = require('express');
require("dotenv").config();
const fs = require('fs');
const userTable = __dirname+'/pages/userDB.json';
const login = express.Router();
const jwt = require('jsonwebtoken');
login.get('/', (req, res) => {
    res.sendFile(__dirname+'/pages/login.html');
});

login.post('/', (req, res) => {
    const {email, password} = req.body;
    if(!(email && password)){
        res.statusCode = 400;
        res.send('Input fields are required!');
    }else{
        fs.readFile(userTable, (err, data) => {
            const users = JSON.parse(data);
            
            const selectUser = users.find((userEmail) => {
                return userEmail.email === email;
            });
            if(selectUser !== undefined){
                const checkPassword = users.find((userPassword) => {
                    return userPassword.password === password;
                });
                if(checkPassword === undefined){
                    res.statusCode = 401;
                    res.send(`Incorecct password or email.`);                
                }else{
                    const token = jwt.sign({ loginEmail : email},
                            process.env.JWT_KEY,
                            {
                                expiresIn : "2h"
                            }
                    
                        );
                    selectUser.token = token;
                    res.statusCode = 200;
                    res.send(selectUser);
                }
            }else{
                res.statusCode = 404;      
                res.send(`User not exist ${email}.`); 
            }
        })
    }
});
module.exports = login;
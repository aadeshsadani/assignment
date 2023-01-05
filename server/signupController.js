const express = require('express');
const signupRoute = express.Router();
const fs = require('fs');
const userTable = __dirname+'/pages/userDB.json';
const collectData = [];

signupRoute.get('/', (req, res) => {
    res.sendFile(__dirname+'/pages/signup.html');
    // res.sendFile(__dirname+'/pages/signup.json');
});

signupRoute.post('/', (req, res) => {
    const userData = req.body;
    if(fs.existsSync(userTable)){
        fs.readFile(userTable, (error, dbData) => {
            if(dbData.length > 0){
                const preData = JSON.parse(dbData);
                const getExisting = preData.filter((data) => data.email === userData.email);
                if(getExisting.length > 0){
                    res.status(409).send('User already exist '+getExisting[0].email+'. Please Login.');
                }else{
                    preData.push(userData);
                    fs.writeFile(userTable, JSON.stringify(preData) , 'utf8', (error) => {
                        if(error){
                            console.log(error)
                        }else{
                            res.send('User added '+userData.email+'.');
                        }
                    });
                }

            }else{
                collectData.push(userData);
                fs.writeFile(userTable, JSON.stringify(collectData) , 'utf8', (error) => {
                    if(error){
                        console.log(error)
                    }else{
                        res.send('User added '+userData.email+'.');
                    }
                });
                // res.sendFile(__dirname+'/pages/signup.html');
            }
        });
    }else{
        collectData.push(userData)
        fs.open(userTable, 'w', (err) => {
            fs.writeFile(userTable, JSON.stringify(collectData) , 'utf8', (error) => {
                if(error){
                    console.log(error)
                }else{
                    res.send('User added '+userData.email+'.');
                    res.end();
                }
            });
        })
    }
});

module.exports = signupRoute;
const express = require('express');
const todoRoute = express.Router();
const fs = require('fs');
const collectTodo = [];
const usersTable = __dirname+'/pages/userDB.json';
const todoFilePath = __dirname+'/pages/todo.json';
todoRoute.get('/:email', (req, res) => {
    const email = req.params.email;
    fs.readFile(todoFilePath, (err, getTodoData) =>{
        if(getTodoData.length > 0){
            const selectedList = JSON.parse(getTodoData);
            const getSpesificRecord = selectedList.find((withEmail)=>{
                return withEmail.user === email;
            });
            if(getSpesificRecord !== undefined){
                res.status(200).send(getSpesificRecord);
            }else{
                res.send(`Sorry record not exist aginst this email : ${email}.`);
            }
        }else{
            res.status(404).send(`Empty`);
        }
    });
    // res.sendFile(__dirname+'/pages/todo.html');
});

todoRoute.post('/:email',(req, res) => {
    const userEmail = req.params.email;
    const { title, description} = req.body;
    const userData = {
        user : userEmail,
        data : [
            {
                title : title,
                description : description.trim()
            }
        ]
    };
    fs.readFile(usersTable, (error, getUser) => {
        if(getUser.length > 0){
            const users = JSON.parse(getUser);
            const findUser = users.find((userFind) => {
                return userFind.email === userEmail;
            });

            if(findUser !== undefined){
                fs.readFile(todoFilePath, (err, todoData) => {
                    // const todoFileData = JSON.parse(todoData);
                    if(todoData.length === 0){
                        collectTodo.push(userData);
                        fs.writeFile(todoFilePath, JSON.stringify(collectTodo), 'utf8', (err) => {
                            if(err){
                                console.log(err);
                            }
                        });
                        res.send('Added');
                    }else{
                        const selectTodo = JSON.parse(todoData);
                        const checkUser = selectTodo.find((checkTodo) => {
                            return checkTodo.user === userEmail;
                        });
                        if(checkUser !== undefined){
                            const findTodoUserWise = selectTodo.findIndex((findTodo) => {
                                return findTodo.user === userEmail;
                            });
                            selectTodo[findTodoUserWise].data.push({
                                title : req.body.title,
                                description : req.body.description
                            });
    
                            fs.writeFile(todoFilePath, JSON.stringify(selectTodo), 'utf8', (err) => {
                                if(err){
                                    console.log(err);
                                }
                            });
                            res.status(200).send('Added.');
                        }else{
                            selectTodo.push(userData);
                            fs.writeFile(todoFilePath, JSON.stringify(selectTodo), 'utf8', (err) => {
                                if(err){
                                    console.log(err);
                                }
                            });
                            res.status(200).send('Added.');
                        }
                    }
                });

            }else{
                res.status(404).send(`Sorry you're not authorized`);
            }

        }
    });
    //
    // fs.readFile(usersTable, (err, data) => {
    //     const users = JSON.parse(data);
    //     const selectUser = users.find((findUser) => {
    //         return findUser.email === userEmail;
    //     });
    //     if(selectUser.todo){
    //         console.log('todo');
    //     }
    //     res.send('todo');
    // });
});
module.exports = todoRoute;
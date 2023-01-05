require('dotenv').config()
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.urlencoded({ extended : false}));
app.use(express.json());

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err)console.log(err);
    console.log(`Server listening at: ${port}`);
});
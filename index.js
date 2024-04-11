const connection=require('./connection');
const express= require('express');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json())

app.get

app.listen(8000,()=>{
    console.log('express server is runninf on port 8000');
})
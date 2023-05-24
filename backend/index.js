///*module. exports is an object in a Node. js file that holds the exported values and functions from that module.
const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db.js');
var app = express();
const employeeController = require ('./controller/employeeController.js')
app.use(bodyParser.json());

app.listen(3000,()=>{
    console.log("Server started at port 4200")
});

app.use(employeeController)



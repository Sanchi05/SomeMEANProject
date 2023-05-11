//Implementing router from express module

const express = require('express');
let router = express.Router(); //using Router() function
var {Employee} = require('../models/employee'); //

//creating a get Request

router.get('/',(req,res)=>{
    const emp = Employee.find().exec();
    console.log(emp);
    res.send(emp);
});

// Creating a post request
router.post("/",(req,res) => {
    //Creating an instance of model Employee
    var emp = new Employee({
        name : req.body.name,
        position : req.body.position,
        officeLocation : req.body.officeLocation,
        salary : req.body.salary
    });
    emp.save();
})

module.exports = router;
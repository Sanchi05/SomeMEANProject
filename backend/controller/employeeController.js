//Implementing router from express module

const express = require('express');
let router = express.Router(); //using Router() function
var {Employee} = require('../models/employee'); //
 

//creating a get Request

router.get('/getAllEmployees',(req,res)=>{
    
    Employee.find({}).then(docs => {
            console.log(docs);
            res.send(docs);
        }).catch(
            err => console.error(err)
        );
});

// Creating a post request
router.post("/",(req,res) => {
    //Creating an instance of model Employee
    var emp = new Employee({
        empId : req.body.empId,
        name : req.body.name,
        position : req.body.position,
        officeLocation : req.body.officeLocation,
        salary : req.body.salary
    });
    if (emp.save()){
        console.log("The document saved in collection is :",JSON.stringify(emp));
        res.send(emp);
    }
})


//Creating a get request to get data for a particular employee id
router.get("/getEmployee/:id", (req,res) => {
    const nullMessage = '{"message": "No record found for the given id"}';
    const id = req.params.id;
    console.log("Id=",id);
    Employee.findOne({empId: id}).then(
        doc => {
            console.log("The result for id:",id,"is:",JSON.stringify(doc));
            if (doc != null){
                res.json(doc);
            } else {
                res.send(JSON.parse(nullMessage));
            }
        }).catch (
            (err) => {
                console.log("Error while fetching data message:",err);
            }
        );
});

module.exports = router;
//Implementing router from express module

const express = require('express');
let router = express.Router(); //using Router() function
var {Employee} = require('../models/employee'); //
 

//1. creating a get Request
router.get('/',(req,res)=>{
    Employee.find({}).then(docs => {
            console.log(docs.length);
            const successResponse = '{"payload":' + JSON.stringify(docs) + '}';
            const nullMessage = '{"message": "No records available"}';
            if (docs.length === 0){
                res.send(JSON.parse(nullMessage));
            } else {
                res.send(JSON.parse(successResponse));
            }
        }).catch(
            err => {
                const errorResponse = '{"message":"Error occured while fetching employee data"}';
                console.error("Error occured while fetching employee data with error:",err);
                res.send(JSON.parse(errorResponse));
            }
        );
});

// 2. Creating a post request to save employee
router.post("/",(req,res) => {
    var emp = new Employee({
        empId : req.body.empId,
        name : req.body.name,
        position : req.body.position,
        officeLocation : req.body.officeLocation,
        salary : req.body.salary
    });
    emp.save().then(doc => {
        console.log("The document saved in the collection is:",doc);
        const successResponse = '{"payload":' + JSON.stringify(doc) + '}';
        res.send(JSON.parse(successResponse));
    }).catch(err => {
        const errorResponse = '{"message":"Error occured while saving the document."}';
        console.log("Error while saving the document for id:",emp.empId, "with error:",err);
        res.send(JSON.parse(errorResponse));
    })
})

//3. Creating a get request to get data for a particular employee id
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
        }).catch ( err => {
                const errorResponse = '{"message":"Error occured while fetching employee data for id: "'+ id +'}';
                res.send(JSON.parse(errorResponse));
                console.error("Error occured while fetching employee data for id:",id, "with error:",err);
            }
        );
});

//4. Updating endpoint using put http method
router.put("/updateEmployee/:id", (req,res) => {
    const id = req.params.id;
    const nullMessage = '{"message": "No updates made as no record found for the given id : ' + id +'}';
    var emp = req.body;
    Employee.findOneAndUpdate({empId: id}, emp,{new:true}).then(doc=>{
        if(doc === null){
            console.log(nullMessage);
            res.send(JSON.parse(nullMessage));
        } else {
            console.log("The updated document is",doc)
            const successResponse = '{"payload":' + JSON.stringify(doc) + '}';
            res.send(JSON.parse(successResponse));
        }
    }).catch (err => {
        const errorResponse = '{"message":"Error while updating the data of given id: "'+ id +'}';
        res.send(JSON.parse(errorResponse));
        console.log("Error while updating the employee data of given id:", id, "with error:",err);        
    });
});

//5. Deleting by empId and using Router.delete() method
router.delete("/deleteEmployee/:id",(req,res)=>{
    const id = req.params.id;
    const successMessage = '{"message":"Employee data removed sucessfully."}';
    const nullMessage = '{"message":"Employee with the given id not present or already deleted."}';
    Employee.findOneAndDelete({empId:id}).then((doc)=>{
        console.log(doc);
        if ( doc === null){
            res.send(JSON.parse(nullMessage));
        } else {
            res.send(JSON.parse(successMessage));
            console.log("Employee removed succesfully for id:",id); 
        }
    }).catch ((err)=>{
        const errorMessage = {
            "status":"500",
            "message":"Error occured while performing the operation"
        }
        res.status(500).json(errorMessage);
        console.log("Error while removing the employee data of given id:", id, "with error:",err);
    })
});

//6. Deleting all employees
router.delete("/deleteAllEmployees",(req,res)=>{
    Employee.deleteMany().then(()=>{
        //const successMessage = '{"message":"All employees deleted sucessfully!"}';
        const success = {
            "status" : "200",
            "message" : "All employees deleted successfully."
        }
        //res.send(JSON.parses(successMessage));
        res.status(200).json(success);
        console.log("All employees deleted successfully");
    }).catch ((err)=>{
        const error = {
            "status" : "500",
            "message" : "Error occured while deleting employess"
        }
        console.log("Error while removing the employees",err);
        res.status(500).json(error);
    });
});

module.exports = router;
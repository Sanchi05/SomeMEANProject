///*module. exports is an object in a Node. js file that holds the exported values and functions from that module.
//Creating a model class for employees
const mongoose = require('mongoose');

//Giving model name and defining model schema
let Employee = mongoose.model('Employee',{
    name : {type: String} ,
    position : {type: String},
    officeLocation : {type: String},
    salary : {type: Number},
});
 
module.exports = {Employee}

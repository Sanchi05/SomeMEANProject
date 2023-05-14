///*module. exports is an object in a Node. js file that holds the exported values and functions from that module.
//Creating a model class for employees
const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    empId: {
        type : String,
        required: true,
        unique : true
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    salary: {
        type: Number,
        required: true
    }, 
    officeLocation: {
        type: String,
        required: false
    }
  });
//Giving model name and defining model schema
let Employee = mongoose.model('Employee',employeeSchema);
 
module.exports = {Employee}


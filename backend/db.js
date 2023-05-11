///*module. exports is an object in a Node. js file that holds the exported values and functions from that module.

var uri = "mongodb://127.0.0.1:27017/CrudDB";
var mongoose = require('mongoose');

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);

mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to db: ", err);
});

mongoose.connection.on("connected", ()=>{
    console.log("Mongoose is connected!");
});


module.exports = mongoose;
const mongoose =require("mongoose")
mongoose.connect("mongodb://localhost:27017/propertyManagement").then(()=>{
console.log("Property management database connected succesfully");
}).catch((err)=>{
console.log(err);
})

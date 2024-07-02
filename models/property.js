const mongoose = require("mongoose")
const multer = require('multer');
const propertySchema = new mongoose.Schema({
    img: {
        type: String,
        // required: [true, "Image url is required"]
    },
    propertyName: {
        type: String,
        // required: [true, "property name is required"]
    },
    ownerName: {
        type: String,
        // required: [true, "Owner name is required"]
    },
    price: {
        type: Number,
        // required: [true, "price is required"]
    },
    address: {
        type:String,
        // required: [true, "address is required"]
    },
    contact:{
          type: String,
            //   required: [true, "contact required"]
    },
    typeofproperty:{
          type: String
    },
    description:{
          type: String
    }

})

const propertyCollection = mongoose.model("property", propertySchema)
module.exports = propertyCollection
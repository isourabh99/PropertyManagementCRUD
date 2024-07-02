var express = require('express');
const propertyCollection = require('../models/property');
require('dotenv').config()
var router = express.Router();
const mongoose=require("mongoose")
const upload= require('../utils/multer')
// const  { sendmail } = require('../utils/sendmail')
// console.log(sendmail);
const {sendmail}=require("../utils/sendmail")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', {
    title: 'Home'
  });
});

// Get register page.
router.get("/register", (req, res, next) => {
  res.render("register", {
    title: "Register Property"
  })
})

// Post register route
router.post("/register", upload.single('img'), async (req, res, next) => {
  console.log(req.file.filename);

  const property = await new propertyCollection(req.body)
  console.log(property);
  property.img = req.file.filename
  property.save()
  await console.log("property created")
  res.redirect("/gallery")

})

// Get gallery page
router.get("/gallery", async (req, res, next) => {
  const property = await propertyCollection.find()
  // await console.log(property);
  res.render("gallery", {
    title: "Gallery",
    property:property
  })
})
// Get explore page
router.get("/explore/:id", async (req, res, next) => {
  
  try {
 const id=req.params.id
 const singleProperty=await propertyCollection.findById(id)
 res.render("explore",{
  title:"Explore",
  singleProperty
 })
  } catch (error) {
    console.log(error.message)
    console.log("error in fetching single property")
  }
})

// Get contact page
router.get("/update/:id", async (req, res, next) => {
  const id= req.params.id
  const updateProperty=await propertyCollection.findById(id)
  res.render("update", {
    title: "Update property",
    updateProperty
  })
})
router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const updateProperty = await propertyCollection.findByIdAndUpdate(id, req.body)
   await res.redirect(`/explore/${id}`)
  } catch (error) {
    console.log(error.message)
    console.log("Error in updating file")
  }
})

// Get delete route
router.get("/delete/:id", async (req, res, next) => {
  const id = req.params.id
  const updateProperty = await propertyCollection.findByIdAndDelete(id)
  res.redirect("/gallery")
})
// Get contact page
router.get("/contact", (req, res, next) => {
  res.render("contact", {
    title: "Contact us"
  })
})
// post email page
router.post("/writetous", async (req, res, next) => {
  sendmail(req,res)
})



module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateAttributeCategoryInput = require('../../validation/AttributeCategory/AttributeCategoryValidation');

//Load AttributeCategory Model
const AttributeCategory = require('../../models/AttributeCategory');


// @route GET  api/attributecategory/test
// @desc  Test AttributeCategory route
// @access public
router.get('/test',(req,res)=> res.json({msg: "AttributeCategory Works!!"}));


// @route GET  api/attributecategory/getattributecategory
// @desc  Test AttributeCategory route
// @access public
router.post('/getattributecategory',async (req,res) => {
        AttributeCategory.find({storeID:req.body.storeID})
        .then(attributecategory => {
            if(!attributecategory){
                errors.attributecategory = ' Attribute Category  Not Found';
                return res.status(404).json(errors);
            }
            res.json(attributecategory);
        })
        .catch(err=> res.status(404).json({error:"AttributeCategory Not Found"}));
})

// @route GET  api/attributecategory/
// @desc  Get All attributecategory
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {

        AttributeCategory.find({adminID:req.user.id})
        .then(attributecategory => {
            if(!attributecategory){
                errors.attributecategory = ' Attribute Category Name Not Found';
                return res.status(404).json(errors);
            }
            res.json(attributecategory);
        })
        .catch(err=> res.status(404).json({error:" Attribute Category Not Found"}));
});


// @route POST  api/attributecategory/
// @desc  Create attributecategory data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateAttributeCategoryInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    const insertdata = {
        attributeName :   req.body.attributeName,
        isEnabled:   req.body.isEnabled,  
        adminID:req.user.id, 
    };
    AttributeCategory.findOne({attributeName:req.body.attributeName})
    .then(result=>{
        if(result){
            errors.attributeName = 'Attribute Name Already Exists';
            return res.status(404).json(errors);
        }
        else{
            new AttributeCategory(insertdata).save().then(attributecategory=>res.json(attributecategory));
        }

    });  
});

// @route GET  api/attributecategory/delete
// @desc  Delete attributecategory by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    AttributeCategory.remove({_id:req.body.id})
    .then(attributecategory => {
        if(!attributecategory){
            errors.attributecategory = 'AttributeCategory not found to delete';
            return res.status(404).json(errors);
        }
        res.json(attributecategory);
    })
    .catch(err=> res.status(404).json({error:"AttributeCategory Not Found"}));
});

// @route GET  api/attributecategory/edit
// @desc  Edit attributecategory by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateAttributeCategoryInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
//GET DATA BY USER TYPE
    //ADMIN TYPE
  
        const editdata = {
            attributeName :   req.body.attributeName,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id, 
        };
      
        AttributeCategory.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(attributecategory => {
            if(!attributecategory){
                errors.attributecategory = ' Attribute Category Not Found';
                return res.status(404).json(errors);
            }
            res.json(attributecategory);
        })
        .catch(err=> res.status(404).json({error:" Attribute Category Not Found"}));
    
   
        
});


module.exports = router;
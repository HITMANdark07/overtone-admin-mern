const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateParentAttributeCategoryInput = require('../../validation/ParentAttributeCategory/ParentAttributeCategoryValidation');

//Load ParentAttributeCategory Model
const ParentAttributeCategory = require('../../models/ParentAttributeCategory');


// @route GET  api/parentattributecategory/test
// @desc  Test ParentAttributeCategory route
// @access public
router.get('/test',(req,res)=> res.json({msg: "ParentAttributeCategory Works!!"}));


// @route GET  api/parentattributecategory/getparentattributecategory
// @desc  Test ParentAttributeCategory route
// @access public
router.post('/getparentattributecategory',async (req,res) => {
        ParentAttributeCategory.find({storeID:req.body.storeID})
        .then(parentattributecategory => {
            if(!parentattributecategory){
                errors.parentattributecategory = 'Parent Attribute Category  Not Found';
                return res.status(404).json(errors);
            }
            res.json(parentattributecategory);
        })
        .catch(err=> res.status(404).json({error:"ParentAttributeCategory Not Found"}));
})

// @route GET  api/parentattributecategory/
// @desc  Get All parentattributecategory
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {

        ParentAttributeCategory.find({adminID:req.user.id})
        .then(parentattributecategory => {
            if(!parentattributecategory){
                errors.parentattributecategory = 'Parent Attribute Category Name Not Found';
                return res.status(404).json(errors);
            }
            res.json(parentattributecategory);
        })
        .catch(err=> res.status(404).json({error:"Parent Attribute Category Not Found"}));
});


// @route POST  api/parentattributecategory/
// @desc  Create parentattributecategory data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateParentAttributeCategoryInput(req.body,req.user);
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
    ParentAttributeCategory.findOne({attributeName:req.body.attributeName})
    .then(result=>{
        if(result){
            errors.attributeName = 'Attribute Name Already Exists';
            return res.status(404).json(errors);
        }
        else{
            new ParentAttributeCategory(insertdata).save().then(parentattributecategory=>res.json(parentattributecategory));
        }

    });  
});

// @route GET  api/parentattributecategory/delete
// @desc  Delete parentattributecategory by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    ParentAttributeCategory.remove({_id:req.body.id})
    .then(parentattributecategory => {
        if(!parentattributecategory){
            errors.parentattributecategory = 'ParentAttributeCategory not found to delete';
            return res.status(404).json(errors);
        }
        res.json(parentattributecategory);
    })
    .catch(err=> res.status(404).json({error:"ParentAttributeCategory Not Found"}));
});

// @route GET  api/parentattributecategory/edit
// @desc  Edit parentattributecategory by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateParentAttributeCategoryInput(req.body,req.user);
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
      
        ParentAttributeCategory.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(parentattributecategory => {
            if(!parentattributecategory){
                errors.parentattributecategory = 'Parent Attribute Category Not Found';
                return res.status(404).json(errors);
            }
            res.json(parentattributecategory);
        })
        .catch(err=> res.status(404).json({error:"Parent Attribute Category Not Found"}));
    
   
        
});


module.exports = router;
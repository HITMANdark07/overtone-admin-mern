const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//Load input Validation
const validateAttributeMappingInput = require('../../validation/AttributeMapping/AttributeMappingValidation');

//Load AttributeMapping Model
const AttributeMapping = require('../../models/AttributeMapping');


// @route GET  api/attributemapping/test
// @desc  Test AttributeMapping route
// @access public
router.get('/test',(req,res)=> res.json({msg: "AttributeMapping Works!!"}));


// @route GET  api/attributemapping/getattributemapping
// @desc  Test AttributeMapping route
// @access public
router.post('/getattributemapping',async (req,res) => {
        AttributeMapping.find({storeID:req.body.storeID})
        .then(attributemapping => {
            if(!attributemapping){
                errors.attributemapping = ' Attribute Category  Not Found';
                return res.status(404).json(errors);
            }
            res.json(attributemapping);
        })
        .catch(err=> res.status(404).json({error:"AttributeMapping Not Found"}));
})

// @route GET  api/attributemapping/getposition
// @desc  Test AttributeMapping route
// @access public
router.post('/getposition',async (req,res) => {
    AttributeMapping.findOne({$and:[{productID:req.body.productID},{parentAttributeCategoryID:req.body.parentAttributeCategoryID}]})
    .then(attributemapping => {
        if(!attributemapping){
            errors.attributemapping = 'Position Not Found';
            return res.status(404).json(errors);
        }
        res.json(attributemapping);
    })
    .catch(err=> res.status(404).json({error:"Position Not Found"}));
})

// @route GET  api/attributemapping/getattributebyproduct
// @desc  Test AttributeMapping route
// @access public
router.post('/getattributebyproduct',async (req,res) => {
    //AttributeMapping.find({productID:req.body.productID})
    AttributeMapping.aggregate([
        {
            $match:{productID:mongoose.Types.ObjectId(req.body.productID)}
        },
        {
           $lookup:{
              from:"parentattributecategories",
              foreignField:"_id",
              localField:"parentAttributeCategoryID",
              as:"parentattributecategory"
           }
        },
        {
            "$unwind": {
                path: "$parentattributecategory",
                preserveNullAndEmptyArrays: true
              }
         },
        {
            $lookup:{
               from:"attributecategories",
               foreignField:"_id",
               localField:"attributeCategoryID",
               as:"attributecategory"
            }
         },
         {
            "$unwind": {
                path: "$attributecategory",
                preserveNullAndEmptyArrays: true
              }
         },
         
        
         { $sort: { date: -1 } },
     ])
    .then(attributemapping => {
        res.json(attributemapping);
    })
    .catch(err=> res.status(404).json({error:"AttributeMapping Not Found"}));
})

// @route GET  api/attributemapping/
// @desc  Get All attributemapping
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {

        AttributeMapping.find()
        .then(attributemapping => {
            if(!attributemapping){
                errors.attributemapping = ' Attribute Category Name Not Found';
                return res.status(404).json(errors);
            }
            res.json(attributemapping);
        })
        .catch(err=> res.status(404).json({error:" Attribute Category Not Found"}));
});


// @route POST  api/attributemapping/
// @desc  Create attributemapping data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateAttributeMappingInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    const insertdata = {
        parentAttributeCategoryID :   req.body.parentAttributeCategoryID,
        attributeCategoryID :   req.body.attributeCategoryID,
        productID :   req.body.productID,
        mappingName :   req.body.mappingName,
        mappingLabel :   req.body.mappingLabel,
        mappingType :   req.body.mappingType,
        mappingValue :   req.body.mappingValue,
        photoUrl :   req.body.photoUrl,
        additionalPrice :   req.body.additionalPrice,
        dependentField :   req.body.dependentField,
        isEnabled:   req.body.isEnabled,  
        adminID:req.user.id, 
    };
    AttributeMapping.findOne({$and:[
        {parentAttributeCategoryID:req.body.parentAttributeCategoryID},
        {attributeCategoryID:req.body.attributeCategoryID},
        {productID:req.body.productID},
        {mappingName:req.body.mappingName},
        {mappingLabel:req.body.mappingLabel},
        {mappingValue:req.body.mappingValue},



    ]})
    .then(result=>{
        if(result){
            errors.mappingLabel = 'Attribute Name Already Exists';
            return res.status(404).json(errors);
        }
        else{
            new AttributeMapping(insertdata).save().then(attributemapping=>res.json(attributemapping));
        }

    });  
});

// @route GET  api/attributemapping/delete
// @desc  Delete attributemapping by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    AttributeMapping.remove({_id:req.body.id})
    .then(attributemapping => {
        if(!attributemapping){
            errors.attributemapping = 'AttributeMapping not found to delete';
            return res.status(404).json(errors);
        }
        res.json(attributemapping);
    })
    .catch(err=> res.status(404).json({error:"AttributeMapping Not Found"}));
});

// @route GET  api/attributemapping/edit
// @desc  Edit attributemapping by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateAttributeMappingInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
//GET DATA BY USER TYPE
    //ADMIN TYPE
  
        const editdata = {
            parentAttributeCategoryID :   req.body.parentAttributeCategoryID,
            attributeCategoryID :   req.body.attributeCategoryID,
            productID :   req.body.productID,
            mappingName :   req.body.mappingName,
            mappingLabel :   req.body.mappingLabel,
            mappingType :   req.body.mappingType,
            mappingValue :   req.body.mappingValue,
            photoUrl :   req.body.photoUrl,
            additionalPrice :   req.body.additionalPrice,
            dependentField :   req.body.dependentField,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id, 
        };
      
        AttributeMapping.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(attributemapping => {
            if(!attributemapping){
                errors.attributemapping = ' Attribute Category Not Found';
                return res.status(404).json(errors);
            }
            res.json(attributemapping);
        })
        .catch(err=> res.status(404).json({error:" Attribute Category Not Found"}));
    
   
        
});


module.exports = router;
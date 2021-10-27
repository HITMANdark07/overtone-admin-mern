const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//Load input Validation
const validateSubCategoryInput = require('../../validation/SubCategory/SubCategoryValidation');

//Load SubCategory Model
const SubCategory = require('../../models/SubCategory');


// @route GET  api/subcategory/test
// @desc  Test SubCategory route
// @access public
router.get('/test',(req,res)=> res.json({msg: "SubCategory Works!!"}));


// @route GET  api/subcategory/getsubcategory/web
// @desc  Test SubCategory route
// @access public
router.post('/getsubcategory/web',(req,res) => {
  SubCategory.aggregate([
         { $match : {categoryID:mongoose.Types.ObjectId(req.body.categoryID)}},
      	{
                    $lookup:{
                         from:"products",
                         foreignField:"subcategoryID",
                         localField:"_id",
                         as:"product"
                    }
                 },
               
                {
                    $project:
                    {
                        _id: 1,
                        subCategoryName: 1,
                        subCategoryNameAr: 1,
                        number_of_product: { $size: "$product" }
                    }
                },
                  { $sort: { date: -1 } },
      ]).then(subcategory => {
        if(!subcategory){
            errors.subcategory = 'SubCategory  Not Found';
            return res.status(404).json(errors);
        }
        res.json(subcategory);
    })
    .catch(err=> res.status(404).json({error:"SubCategory Not Found"}));
})

// @route GET  api/subcategory/getsubcategory
// @desc  Test SubCategory route
// @access public
router.post('/getsubcategory',(req,res) => {
    // SubCategory.aggregate([
    //     { $match : { storeID:mongoose.Types.ObjectId(req.body.storeID),categoryID:req.body.categoryID}},
    //     {
    //        $lookup:{
    //           from:"categories",
    //           foreignField:"_id",
    //           localField:"categoryID",
    //           as:"category"
    //        }
    //     },
    //     {
    //        $unwind:"$category"
    //     },
    //      { $sort: { date: -1 } },
    //  ])
    SubCategory.find({categoryID:req.body.categoryID})
    //SubCategory.find({categoryID:req.body.categoryID})
    .then(subcategory => {
        if(!subcategory){
            errors.subcategory = 'SubCategory  Not Found';
            return res.status(404).json(errors);
        }
        res.json(subcategory);
    })
    .catch(err=> res.status(404).json({error:"SubCategory Not Found"}));

})
// @route GET  api/subcategory/
// @desc  Get All subcategory
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {

    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
       // SubCategory.find({adminID:req.user.id})
       SubCategory.aggregate([
        {
           $lookup:{
              from:"categories",
              foreignField:"_id",
              localField:"categoryID",
              as:"category"
           }
        },
        {
            "$unwind": {
                path: "$category",
                preserveNullAndEmptyArrays: true
              }
         },
         { $sort: { date: -1 } },
     ])
        .then(subcategory => {
            if(!subcategory){
                errors.subcategory = 'SubCategory Name Not Found';
                return res.status(404).json(errors);
            }
            res.json(subcategory);
        })
        .catch(err=> res.status(404).json({error:"SubCategory Not Found"}));
    }
    //STORE TYPE
    if(req.user.userType==='store'){
        // SubCategory.find({adminID:req.body.adminID})
        SubCategory.aggregate([
            { $match : {storeID:mongoose.Types.ObjectId(req.user.id)} },
            {
               $lookup:{
                  from:"categories",
                  foreignField:"_id",
                  localField:"categoryID",
                  as:"category"
               }
            },
            {
                "$unwind": {
                    path: "$category",
                    preserveNullAndEmptyArrays: true
                  }
             },
             { $sort: { date: -1 } },
         ])
        .then(subcategory => {
            if(!subcategory){
                errors.subcategory = 'SubCategory  Not Found';
                return res.status(404).json(errors);
            }
            res.json(subcategory);
        })
        .catch(err=> res.status(404).json({error:"SubCategory Not Found"}));
    }
});

// @route POST  api/subcategory/
// @desc  Create subcategory data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateSubCategoryInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
  
    
    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        const insertdata = {
            categoryID   :   req.body.categoryID,
            subCategoryName :   req.body.subCategoryName,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id,
        };
        SubCategory.findOne({$and:[{categoryID:req.body.categoryID},{subCategoryName:req.body.subCategoryName}]})
        .then(result=>{
           if(result){
               errors.subcategoryName = 'SubCategory Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new SubCategory(insertdata).save().then(subcategory=>res.json(subcategory));
           }
   
       });
    }

     //STORE TYPE
     if(req.user.userType==='store'){
        const insertdata = {
            categoryID   :   req.body.categoryID,
            subCategoryName :   req.body.subCategoryName,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id,
        };
        SubCategory.findOne({$and:[{storeID:req.user.id},{categoryID:req.body.categoryID},{subCategoryName:req.body.subcategoryName}]})
        .then(result=>{
           if(result){
               errors.subcategoryName = 'SubCategory Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new SubCategory(insertdata).save().then(subcategory=>res.json(subcategory));
           }
   
       });
    }
    
});

// @route GET  api/subcategory/delete
// @desc  Delete subcategory by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    SubCategory.remove({_id:req.body.id})
    .then(subcategory => {
        if(!subcategory){
            errors.subcategory = 'SubCategory not found to delete';
            return res.status(404).json(errors);
        }
        res.json(subcategory);
    })
    .catch(err=> res.status(404).json({error:"SubCategory Not Found"}));
});

// @route GET  api/subcategory/edit
// @desc  Edit subcategory by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateSubCategoryInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
//GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        const editdata = {
            categoryID   :   req.body.categoryID,
            subCategoryName :   req.body.subCategoryName,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id,
        };
      
        SubCategory.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(subcategory => {
            if(!subcategory){
                errors.subcategory = 'subcategory not found';
                return res.status(404).json(errors);
            }
            res.json(subcategory);
        })
        .catch(err=> res.status(404).json({error:"SubCategory Not Found"}));
    }
    //STORE TYPE
    if(req.user.userType==='store'){
        const editdata = {
            categoryID   :   req.body.categoryID,
            subCategoryName :   req.body.subCategoryName,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id,
        };
      
        SubCategory.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(subcategory => {
            if(!subcategory){
                errors.subcategory = 'subcategory not found';
                return res.status(404).json(errors);
            }
            res.json(subcategory);
        })
        .catch(err=> res.status(404).json({error:"SubCategory Not Found"}));
    }
   
        
});


module.exports = router;

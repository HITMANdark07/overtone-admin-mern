const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateCategoryInput = require('../../validation/Category/CategoryValidation');

//Load Category Model
const Category = require('../../models/Category');


// @route GET  api/category/test
// @desc  Test Category route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Category Works!!"}));


// @route GET  api/category/getcategory
// @desc  Test Category route
// @access public
router.post('/getcategory',async (req,res) => {
        Category.find({storeID:req.body.storeID})
        .then(category => {
            if(!category){
                errors.category = 'Category  Not Found';
                return res.status(404).json(errors);
            }
            res.json(category);
        })
        .catch(err=> res.status(404).json({error:"Category Not Found"}));
})

// @route GET  api/category/
// @desc  Get All category
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {

        Category.find({adminID:req.user.id})
        .then(category => {
            if(!category){
                errors.category = 'Category Name Not Found';
                return res.status(404).json(errors);
            }
            res.json(category);
        })
        .catch(err=> res.status(404).json({error:"Category Not Found"}));
});


// @route POST  api/category/
// @desc  Create category data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateCategoryInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
  
    
    
        const insertdata = {

            categoryName :   req.body.categoryName,
            dropdown :   req.body.dropdown,
            sliderStyle :   req.body.sliderStyle,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id, 
        };
        Category.findOne({categoryName:req.body.categoryName})
        .then(result=>{
           if(result){
               errors.categoryName = 'Category Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new Category(insertdata).save().then(category=>res.json(category));
           }
   
       });
    

    
    
});

// @route GET  api/category/delete
// @desc  Delete category by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Category.remove({_id:req.body.id})
    .then(category => {
        if(!category){
            errors.category = 'Category not found to delete';
            return res.status(404).json(errors);
        }
        res.json(category);
    })
    .catch(err=> res.status(404).json({error:"Category Not Found"}));
});

// @route GET  api/category/edit
// @desc  Edit category by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateCategoryInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
//GET DATA BY USER TYPE
    //ADMIN TYPE
  
        const editdata = {
            categoryName :   req.body.categoryName,
            dropdown :   req.body.dropdown,
            sliderStyle :   req.body.sliderStyle,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id, 
        };
      
        Category.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(category => {
            if(!category){
                errors.category = 'category not found';
                return res.status(404).json(errors);
            }
            res.json(category);
        })
        .catch(err=> res.status(404).json({error:"Category Not Found"}));
    
   
        
});


module.exports = router;
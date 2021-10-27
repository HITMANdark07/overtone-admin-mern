const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateShippingInput = require('../../validation/Shipping/ShippingValidation');

//Load Shipping Model
const Shipping = require('../../models/Shipping');


// @route GET  api/shipping/test
// @desc  Test Shipping route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Shipping Works!!"}));

router.get('/web',(req,res) => {
    Shipping.find()
    .then(shipping => {
        res.json(shipping);
    })
    .catch(err=> res.status(404).json({error:"Shipping Not Found"}));
})
// @route GET  api/shipping/
// @desc  Get All shipping
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        console.log("working inside")
        Shipping.find()
        .then(shipping => {
            if(!shipping){
                errors.shipping = 'Shipping Name Not Found';
                return res.status(404).json(errors);
            }
            console.log("working inside data",shipping)
            res.json(shipping);
        })
        .catch(err=> res.status(404).json({error:"Shipping Not Found"}));
    }
   
});


// @route POST  api/shipping/
// @desc  Create shipping data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateShippingInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
  
    
    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        const insertdata = {
            shippingName :   req.body.shippingName,
            shippingDesc :   req.body.shippingDesc,
            amount:   req.body.amount, 
            adminID:req.user.id, 
        };
        Shipping.findOne({shippingName:req.body.shippingName})
        .then(result=>{
           if(result){
               errors.shippingName = 'Shipping Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new Shipping(insertdata).save().then(shipping=>res.json(shipping));
           }
   
       });
    }

   
    
});

// @route GET  api/shipping/delete
// @desc  Delete shipping by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Shipping.remove({_id:req.body.id})
    .then(shipping => {
        if(!shipping){
            errors.shipping = 'Shipping not found to delete';
            return res.status(404).json(errors);
        }
        res.json(shipping);
    })
    .catch(err=> res.status(404).json({error:"Shipping Not Found"}));
});

// @route GET  api/shipping/edit
// @desc  Edit shipping by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateShippingInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
//GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        const editdata = {
            shippingName :   req.body.shippingName,
            shippingDesc :   req.body.shippingDesc,
            amount:   req.body.amount, 
            adminID:req.user.id, 
        };
      
        Shipping.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(shipping => {
            if(!shipping){
                errors.shipping = 'shipping not found';
                return res.status(404).json(errors);
            }
            res.json(shipping);
        })
        .catch(err=> res.status(404).json({error:"Shipping Not Found"}));
    }
   
   
        
});


module.exports = router;
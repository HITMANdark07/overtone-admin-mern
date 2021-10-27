const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateOrderStatusInput = require('../../validation/OrderStatus/OrderStatusValidation');

//Load OrderStatus Model
const OrderStatus = require('../../models/OrderStatus');


// @route GET  api/orderstatus/test
// @desc  Test OrderStatus route
// @access public
router.get('/test',(req,res)=> res.json({msg: "OrderStatus Works!!"}));


router.post('/getorderstatus',async (req,res) => {
//    var adminid=await Admin.findOne();
    OrderStatus.find({storeID:req.body.storeID})
    .then(orderstatus => {
        if(!orderstatus){
            errors.orderstatus = 'OrderStatus  Not Found';
            return res.status(404).json(errors);
        }
        res.json(orderstatus);
    })
    .catch(err=> res.status(404).json({error:"OrderStatus Not Found"}));
})
// @route GET  api/orderstatus/
// @desc  Get All orderstatus
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {

    //GET DATA BY USER TYPE
    //ADMIN TYPE
    
        OrderStatus.find({adminID:req.user.id})
        .then(orderstatus => {
            if(!orderstatus){
                errors.orderstatus = 'OrderStatus Name Not Found';
                return res.status(404).json(errors);
            }
            res.json(orderstatus);
        })
        .catch(err=> res.status(404).json({error:"OrderStatus Not Found"}));
    
   
});

// @route POST  api/orderstatus/
// @desc  Create orderstatus data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateOrderStatusInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
  
    
    
        const insertdata = {
            StatusName   :   req.body.StatusName,
            
            visibility :   req.body.visibility,
            adminID:req.user.id, 
        };
        OrderStatus.findOne({StatusName:req.body.StatusName})
        .then(result=>{
           if(result){
               errors.StatusName = 'Order Status Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new OrderStatus(insertdata).save().then(orderstatus=>res.json(orderstatus));
           }
   
       });
    

    
    
});

// @route GET  api/orderstatus/delete
// @desc  Delete orderstatus by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    OrderStatus.remove({_id:req.body.id})
    .then(orderstatus => {
        if(!orderstatus){
            errors.orderstatus = 'OrderStatus not found to delete';
            return res.status(404).json(errors);
        }
        res.json(orderstatus);
    })
    .catch(err=> res.status(404).json({error:"OrderStatus Not Found"}));
});

// @route GET  api/orderstatus/edit
// @desc  Edit orderstatus by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateOrderStatusInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
//GET DATA BY USER TYPE
    //ADMIN TYPE
  
        const editdata = {
            StatusName   :   req.body.StatusName,
            
            visibility :   req.body.visibility,
            adminID:req.user.id, 
        };
      
        OrderStatus.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(orderstatus => {
            if(!orderstatus){
                errors.orderstatus = 'orderstatus not found';
                return res.status(404).json(errors);
            }
            res.json(orderstatus);
        })
        .catch(err=> res.status(404).json({error:"OrderStatus Not Found"}));
    
   
        
});


module.exports = router;
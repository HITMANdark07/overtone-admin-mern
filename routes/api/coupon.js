const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateCouponInput = require('../../validation/Coupon/CouponValidation');

//Load Coupon Model
const Coupon = require('../../models/Coupon');
const Order = require('../../models/Order');


const currentDate = () => {
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
    
}


// @route GET  api/coupon/test
// @desc  Test Coupon route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Coupon Works!!"}));

router.post('/validate',passport.authenticate('jwt',{session:false}),(req,res) => {
    
    Coupon.findOne({$and:[{couponCode:req.body.couponCode},{"isEnabled" : "Yes"}]})
    .then(coupon => {
        
        if(coupon){
            Order.findOne({$and:[{couponCode:req.body.couponCode},{userID:req.user.id}]})
            .then(result=>{
                if(!result){
                    res.status(400).json({error:"Coupon Code Already Used"});
                }
            })
            var fromDate = new Date(coupon.validFrom).getTime();
            let curDate=new Date(currentDate()).getTime()
            var toDate = new Date(coupon.validTo).getTime();
          

            if(curDate>=fromDate && curDate<toDate){
                res.json(coupon);
            }else{
                res.status(400).json({error:"Coupon Code is Expired"});
            }
           
        }else{
            res.status(400).json({error:"Coupon Code is Invalid"});
        }
        
    })
    .catch(err=>{
        console.log("err",err)
        res.status(404).json({error:"Coupon Not Found"})
    } );
})



// @route GET  api/coupon/
// @desc  Get All coupon
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        console.log("working inside")
        Coupon.find()
        .then(coupon => {
            if(!coupon){
                errors.coupon = 'Coupon Name Not Found';
                return res.status(404).json(errors);
            }
            console.log("working inside data",coupon)
            res.json(coupon);
        })
        .catch(err=> res.status(404).json({error:"Coupon Not Found"}));
    }
   
});


// @route POST  api/coupon/
// @desc  Create coupon data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateCouponInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
  
    
    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        const insertdata = {
            couponCode   :   req.body.couponCode,
            type :   req.body.type,
            value :   req.body.value,
            validFrom:   req.body.validFrom, 
            validTo:   req.body.validTo, 
            isEnabled:   req.body.isEnabled, 
            adminID:req.user.id, 
        };
        Coupon.findOne({couponCode:req.body.couponCode})
        .then(result=>{
           if(result){
               errors.couponCode = 'Coupon Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new Coupon(insertdata).save().then(coupon=>res.json(coupon));
           }
   
       });
    }

   
    
});

// @route GET  api/coupon/delete
// @desc  Delete coupon by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Coupon.remove({_id:req.body.id})
    .then(coupon => {
        if(!coupon){
            errors.coupon = 'Coupon not found to delete';
            return res.status(404).json(errors);
        }
        res.json(coupon);
    })
    .catch(err=> res.status(404).json({error:"Coupon Not Found"}));
});

// @route GET  api/coupon/edit
// @desc  Edit coupon by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateCouponInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
//GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        const editdata = {
            couponCode   :   req.body.couponCode,
            type :   req.body.type,
            value :   req.body.value,
            validFrom:   req.body.validFrom, 
            validTo:   req.body.validTo, 
            isEnabled:   req.body.isEnabled, 
            adminID:req.user.id, 
        };
      
        Coupon.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(coupon => {
            if(!coupon){
                errors.coupon = 'coupon not found';
                return res.status(404).json(errors);
            }
            res.json(coupon);
        })
        .catch(err=> res.status(404).json({error:"Coupon Not Found"}));
    }
   
   
        
});


module.exports = router;
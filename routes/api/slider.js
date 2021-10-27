const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateSliderInput = require('../../validation/Slider/SliderValidation');

//Load Slider Model
const Slider = require('../../models/Slider');


// @route GET  api/slider/test
// @desc  Test Slider route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Slider Works!!"}));

router.get('/mobile/getslider',(req,res) => {
    Slider.find()
    .then(slider => {
        res.json(slider);
    })
    .catch(err=> res.status(404).json({error:"Slider Not Found"}));
})
// @route GET  api/slider/
// @desc  Get All slider
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        console.log("working inside")
        Slider.aggregate([
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
             {
                $lookup:{
                     from:"products",
                     foreignField:"_id",
                     localField:"productID",
                     as:"product"
                }
             },
             {
                "$unwind": {
                    path: "$product",
                    preserveNullAndEmptyArrays: true
                  }
             },
             { $sort: { date: -1 } },
    ])
        //.find()
        .then(slider => {
            if(!slider){
                errors.slider = 'Slider Name Not Found';
                return res.status(404).json(errors);
            }
            console.log("working inside data",slider)
            res.json(slider);
        })
        .catch(err=> res.status(404).json({error:"Slider Not Found"}));
    }
   
});


// @route POST  api/slider/
// @desc  Create slider data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateSliderInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
  
    
    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        const insertdata = {
            photoUrl   :   req.body.photoUrl,
            sliderName :   req.body.sliderName,
            productID :   req.body.productID!=""?req.body.productID:null,
            categoryID :   req.body.categoryID,
            visiblity:   req.body.visiblity,  //visible,hidden
            sliderTitle:   req.body.sliderTitle,  
            sliderDesc:   req.body.sliderDesc,  
            adminID:req.user.id, 
        };
        Slider.findOne({sliderName:req.body.sliderName})
        .then(result=>{
           if(result){
               errors.sliderName = 'Slider Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new Slider(insertdata).save().then(slider=>res.json(slider));
           }
   
       });
    }

   
    
});

// @route GET  api/slider/delete
// @desc  Delete slider by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Slider.remove({_id:req.body.id})
    .then(slider => {
        if(!slider){
            errors.slider = 'Slider not found to delete';
            return res.status(404).json(errors);
        }
        res.json(slider);
    })
    .catch(err=> res.status(404).json({error:"Slider Not Found"}));
});

// @route GET  api/slider/edit
// @desc  Edit slider by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateSliderInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
//GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        const editdata = {
            photoUrl   :   req.body.photoUrl,
            sliderName :   req.body.sliderName,
            productID :    req.body.productID !=""?req.body.productID:null,
            categoryID :   req.body.categoryID,
            visiblity:   req.body.visiblity,  //visible,hidden
            sliderTitle:   req.body.sliderTitle,  
            sliderDesc:   req.body.sliderDesc, 
            adminID:req.user.id, 
        };
      
        Slider.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(slider => {
            if(!slider){
                errors.slider = 'slider not found';
                return res.status(404).json(errors);
            }
            res.json(slider);
        })
        .catch(err=> res.status(404).json({error:"Slider Not Found"}));
    }
   
   
        
});


module.exports = router;
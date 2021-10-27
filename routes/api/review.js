const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Load Review Model
const Review = require('../../models/Review');


// @route GET  api/review/test
// @desc  Test Review route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Review Works!!"}));

router.get('/mobile/getreview',(req,res) => {
    Review.find()
    .then(review => {
        res.json(review);
    })
    .catch(err=> res.status(404).json({error:"Review Not Found"}));
})
// @route GET  api/review/
// @desc  Get All review
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        console.log("working inside")
        Review.find()
        .then(review => {
            if(!review){
                errors.review = 'Review Name Not Found';
                return res.status(404).json(errors);
            }
            console.log("working inside data",review)
            res.json(review);
        })
        .catch(err=> res.status(404).json({error:"Review Not Found"}));
    }
   
});


// @route POST  api/review/
// @desc  Create review data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
  
    
    //GET DATA BY USER TYPE
    //ADMIN TYPE
  
        const insertdata = {
            userID   :   req.user.id,
            productID :   req.body.productID,
            review :   req.body.review,
            status:   req.body.status,  //visible,hidden
        };
        Review.findOne({reviewName:req.body.reviewName})
        .then(result=>{
           if(result){
               errors.reviewName = 'Review Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new Review(insertdata).save().then(review=>res.json(review));
           }
   
       });
  

   
    
});

// @route GET  api/review/delete
// @desc  Delete review by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Review.remove({_id:req.body.id})
    .then(review => {
        if(!review){
            errors.review = 'Review not found to delete';
            return res.status(404).json(errors);
        }
        res.json(review);
    })
    .catch(err=> res.status(404).json({error:"Review Not Found"}));
});

// @route GET  api/review/edit
// @desc  Edit review by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

        //Check Validation
        if(!isValid){
            //if Any errors, send 400 with errors object
            return res.status(400).json(errors);
        }
        const editdata = {
            visiblity:   req.body.visiblity,  //visible,hidden
        };
        Review.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(review => {
            if(!review){
                errors.review = 'review not found';
                return res.status(404).json(errors);
            }
            res.json(review);
        })
        .catch(err=> res.status(404).json({error:"Review Not Found"}));
      
});


module.exports = router;
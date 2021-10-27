const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateBlogInput = require('../../validation/Blog/BlogValidation');

//Load Blog Model
const Blog = require('../../models/Blog');


// @route GET  api/slider/test
// @desc  Test Blog route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Blog Works!!"}));

router.get('/mobile/getslider',(req,res) => {
    Blog.find()
    .then(slider => {
        res.json(slider);
    })
    .catch(err=> res.status(404).json({error:"Blog Not Found"}));
})
// @route GET  api/slider/
// @desc  Get All slider
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        console.log("working inside")
        Blog.find()
        .then(slider => {
            if(!slider){
                errors.slider = 'Blog Name Not Found';
                return res.status(404).json(errors);
            }
            console.log("working inside data",slider)
            res.json(slider);
        })
        .catch(err=> res.status(404).json({error:"Blog Not Found"}));
    }
   
});


// @route POST  api/slider/
// @desc  Create slider data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateBlogInput(req.body,req.user);
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
            title :   req.body.title,
            content :   req.body.content,
            shortContent :   req.body.shortContent,
            blogType :   req.body.blogType,
            sliderImage :   req.body.sliderImage,
            visiblity:   req.body.visiblity,  //visible,hidden
            adminID:req.user.id, 
        };
        Blog.findOne({title:req.body.title})
        .then(result=>{
           if(result){
               errors.title = 'Title Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new Blog(insertdata).save().then(slider=>res.json(slider));
           }
   
       });
    }

   
    
});

// @route GET  api/slider/delete
// @desc  Delete slider by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Blog.remove({_id:req.body.id})
    .then(slider => {
        if(!slider){
            errors.slider = 'Blog not found to delete';
            return res.status(404).json(errors);
        }
        res.json(slider);
    })
    .catch(err=> res.status(404).json({error:"Blog Not Found"}));
});

// @route GET  api/slider/edit
// @desc  Edit slider by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateBlogInput(req.body,req.user);
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
            title :   req.body.title,
            content :   req.body.content,
            shortContent :   req.body.shortContent,
            blogType :   req.body.blogType,
            sliderImage :   req.body.sliderImage,
            visiblity:   req.body.visiblity,  //visible,hidden
            adminID:req.user.id,
        };
      
        Blog.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(slider => {
            if(!slider){
                errors.slider = 'slider not found';
                return res.status(404).json(errors);
            }
            res.json(slider);
        })
        .catch(err=> res.status(404).json({error:"Blog Not Found"}));
    }
   
   
        
});

/*WEB API */
router.post('/web',(req,res) => {
    Blog.find({blogType:req.body.blogType})
    .then(result => {
        res.json(result);
    })
    .catch(err=> res.status(404).json({error:"Blog Not Found"}));
})


module.exports = router;

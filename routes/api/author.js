const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateAuthorInput = require('../../validation/Author/AuthorValidation');

//Load Author Model
const Author = require('../../models/Author');


// @route GET  api/author/test
// @desc  Test Author route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Author Works!!"}));


router.get('/mobile/getauthor',async (req,res) => {
//    var adminid=await Admin.findOne();
    Author.find()
    .then(author => {
        if(!author){
            errors.author = 'Author  Not Found';
            return res.status(404).json(errors);
        }
        res.json(author);
    })
    .catch(err=> res.status(404).json({error:"Author Not Found"}));
})
// @route GET  api/author/
// @desc  Get All author
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    Author.find()
    .then(author => {
        if(!author){
            errors.author = 'Author  Not Found';
            return res.status(404).json(errors);
        }
        res.json(author);
    })
    .catch(err=> res.status(404).json({error:"Author Not Found"}));
 
});

// @route POST  api/author/
// @desc  Create author data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateAuthorInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
  
    
    //GET DATA BY USER TYPE
    //ADMIN TYPE
  
        const insertdata = {
            name   :   req.body.name,
            nameAr   :   req.body.nameAr,
            email :   req.body.email,
            mobile:   req.body.mobile,  
            photo:req.body.photo, 
            description:req.body.description,
            descriptionAr:req.body.descriptionAr

        };
        Author.findOne({email :   req.body.email,})
        .then(result=>{
           if(result){
               errors.authorName = 'Email Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new Author(insertdata).save().then(author=>res.json(author));
           }
   
       });
    

     
    
});

// @route GET  api/author/delete
// @desc  Delete author by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Author.remove({_id:req.body.id})
    .then(author => {
        if(!author){
            errors.author = 'Author not found to delete';
            return res.status(404).json(errors);
        }
        res.json(author);
    })
    .catch(err=> res.status(404).json({error:"Author Not Found"}));
});

// @route GET  api/author/edit
// @desc  Edit author by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateAuthorInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
//GET DATA BY USER TYPE
    //ADMIN TYPE
 
        const editdata = {
            name   :   req.body.name,
            nameAr   :   req.body.nameAr,
            email :   req.body.email,
            mobile:   req.body.mobile,  
            photo:req.body.photo, 
            description:req.body.description,
            descriptionAr:req.body.descriptionAr
        };
      
        Author.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(author => {
            if(!author){
                errors.author = 'author not found';
                return res.status(404).json(errors);
            }
            res.json(author);
        })
        .catch(err=> res.status(404).json({error:"Author Not Found"}));
    
  
   
        
});


module.exports = router;
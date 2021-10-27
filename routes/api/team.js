const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateTeamInput = require('../../validation/Team/TeamValidation');

//Load Team Model
const Team = require('../../models/Team');


// @route GET  api/team/test
// @desc  Test Team route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Team Works!!"}));

router.get('/mobile/getteam',(req,res) => {
    Team.find()
    .then(team => {
        res.json(team);
    })
    .catch(err=> res.status(404).json({error:"Team Not Found"}));
})
// @route GET  api/team/
// @desc  Get All team
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
        console.log("working inside")
        Team.find()
        .then(team => {
            if(!team){
                errors.team = 'Team Name Not Found';
                return res.status(404).json(errors);
            }
            console.log("working inside data",team)
            res.json(team);
        })
        .catch(err=> res.status(404).json({error:"Team Not Found"}));
    }
   
});


// @route POST  api/team/
// @desc  Create team data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateTeamInput(req.body,req.user);
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
            name :   req.body.name,
            nameAr :   req.body.nameAr,
            position :   req.body.position,
            positionAr :   req.body.positionAr,
            visiblity:   req.body.visiblity,  //visible,hidden
            adminID:req.user.id, 
        };
        Team.findOne({name:req.body.name})
        .then(result=>{
           if(result){
               errors.name = 'Team Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new Team(insertdata).save().then(team=>res.json(team));
           }
   
       });
    }

   
    
});

// @route GET  api/team/delete
// @desc  Delete team by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Team.remove({_id:req.body.id})
    .then(team => {
        if(!team){
            errors.team = 'Team not found to delete';
            return res.status(404).json(errors);
        }
        res.json(team);
    })
    .catch(err=> res.status(404).json({error:"Team Not Found"}));
});

// @route GET  api/team/edit
// @desc  Edit team by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateTeamInput(req.body,req.user);
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
            name :   req.body.name,
            nameAr :   req.body.nameAr,
            position :   req.body.position,
            positionAr :   req.body.positionAr,
            visiblity:   req.body.visiblity,  //visible,hidden
            adminID:req.user.id, 
        };
      
        Team.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(team => {
            if(!team){
                errors.team = 'team not found';
                return res.status(404).json(errors);
            }
            res.json(team);
        })
        .catch(err=> res.status(404).json({error:"Team Not Found"}));
    }
   
   
        
});


module.exports = router;
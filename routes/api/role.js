const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateRoleInput = require('../../validation/Role/RoleValidation');

//Load Role Model
const Role = require('../../models/Role');


// @route GET  api/role/test
// @desc  Test Role route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Role Works!!"}));


// @route GET  api/role/
// @desc  Get All role
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {

        Role.find()
        .then(role => {
            if(!role){
                errors.role = 'Role Name Not Found';
                return res.status(404).json(errors);
            }
            res.json(role);
        })
        .catch(err=> res.status(404).json({error:"Role Not Found"}));
});

// @route POST  api/role/
// @desc  Create role data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
        const {errors, isValid} = validateRoleInput(req.body,req.user);
        //Check Validation
        if(!isValid){
            //if Any errors, send 400 with errors object
            return res.status(400).json(errors);
        }
        const insertdata = {
            adminId:   req.user.id,
            roleName   :   req.body.roleName,
            permissionList   :   req.body.permissionList,
            isEnabled :   req.body.isEnabled,
        };
        Role.findOne({roleName:req.body.roleName})
        .then(result=>{
           if(result){
               errors.roleName = 'Role Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new Role(insertdata).save().then(role=>res.json(role));
           }
   
       });
});

// @route GET  api/role/delete
// @desc  Delete role by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Role.remove({_id:req.body.id})
    .then(role => {
        if(!role){
            errors.role = 'Role not found to delete';
            return res.status(404).json(errors);
        }
        res.json(role);
    })
    .catch(err=> res.status(404).json({error:"Role Not Found"}));
});

// @route GET  api/role/edit
// @desc  Edit role by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateRoleInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    //GET DATA BY USER TYPE
    //ADMIN TYPE
    const editdata = {
        adminId:   req.user.id,
        roleName   :   req.body.roleName,
        permissionList   :   req.body.permissionList,
        isEnabled :   req.body.isEnabled,
    };
      
     Role.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(role => {
            if(!role){
                errors.role = 'role not found';
                return res.status(404).json(errors);
            }
            res.json(role);
        })
        .catch(err=> res.status(404).json({error:"Role Not Found"}));    
});


module.exports = router;
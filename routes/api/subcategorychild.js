const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//Load input Validation
const validateSubCategoryChildInput = require('../../validation/SubCategoryChild/SubCategoryChildValidation');

//Load SubCategoryChild Model
const SubCategoryChild = require('../../models/SubCategoryChild');


// @route GET  api/subcategorychild/test
// @desc  Test SubCategoryChild route
// @access public
router.get('/test',(req,res)=> res.json({msg: "SubCategoryChild Works!!"}));


router.post('/getsubcategorychild/web',(req,res) => {
  SubCategoryChild.aggregate([
         { $match : {subcategoryID:mongoose.Types.ObjectId(req.body.subcategoryID)}},
      	{
                    $lookup:{
                         from:"products",
                         foreignField:"subcategoryChildID",
                         localField:"_id",
                         as:"product"
                    }
                 },
               
                {
                    $project:
                    {
                        _id: 1,
                        subCategoryChildName: 1,
                        subCategoryNameAr: 1,
                        number_of_product: { $size: "$product" }
                    }
                },
                  { $sort: { date: -1 } },
      ]).then(subcategorychild => {
        if(!subcategorychild){
            errors.subcategorychild = 'SubCategoryChild  Not Found';
            return res.status(404).json(errors);
        }
        res.json(subcategorychild);
    })
    .catch(err=> res.status(404).json({error:"SubCategoryChild Not Found"}));
})
router.post('/getsubcategorychild',(req,res) => {
    // SubCategoryChild.aggregate([
    //     { $match : { storeID:mongoose.Types.ObjectId(req.body.storeID),categoryID:req.body.categoryID}},
    //     {
    //        $lookup:{
    //           from:"categories",
    //           foreignField:"_id",
    //           localField:"categoryID",
    //           as:"category"
    //        }
    //     },
    //     {
    //        $unwind:"$category"
    //     },
    //      { $sort: { date: -1 } },
    //  ])
    SubCategoryChild.find({subcategoryID:req.body.subcategoryID})
    //SubCategoryChild.find({categoryID:req.body.categoryID})
    .then(subcategorychild => {
        if(!subcategorychild){
            errors.subcategorychild = 'SubCategoryChild  Not Found';
            return res.status(404).json(errors);
        }
        res.json(subcategorychild);
    })
    .catch(err=> res.status(404).json({error:"SubCategoryChild Not Found"}));

})
// @route GET  api/subcategorychild/
// @desc  Get All subcategorychild
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {

    //GET DATA BY USER TYPE
    //ADMIN TYPE
    if(req.user.userType==='admin'){
       // SubCategoryChild.find({adminID:req.user.id})
       SubCategoryChild.aggregate([
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
               from:"subcategories",
               foreignField:"_id",
               localField:"subcategoryID",
               as:"subcategory"
            }
         },
         {
            "$unwind": {
                path: "$subcategory",
                preserveNullAndEmptyArrays: true
              }
         },
         
        
         { $sort: { date: -1 } },
     ])
        .then(subcategorychild => {
            if(!subcategorychild){
                errors.subcategorychild = 'SubCategoryChild Name Not Found';
                return res.status(404).json(errors);
            }
            res.json(subcategorychild);
        })
        .catch(err=> res.status(404).json({error:"SubCategoryChild Not Found"}));
    }
    //STORE TYPE
    if(req.user.userType==='store'){
        // SubCategoryChild.find({adminID:req.body.adminID})
        SubCategoryChild.aggregate([
            { $match : {storeID:mongoose.Types.ObjectId(req.user.id)} },
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
                    from:"subcategories",
                    foreignField:"_id",
                    localField:"subcategoryID",
                    as:"subcategory"
                 }
              },
              {
                "$unwind": {
                    path: "$subcategory",
                    preserveNullAndEmptyArrays: true
                  }
             },
              
             { $sort: { date: -1 } },
         ])
        .then(subcategorychild => {
            if(!subcategorychild){
                errors.subcategorychild = 'SubCategoryChild  Not Found';
                return res.status(404).json(errors);
            }
            res.json(subcategorychild);
        })
        .catch(err=> res.status(404).json({error:"SubCategoryChild Not Found"}));
    }
});

// @route POST  api/subcategorychild/
// @desc  Create subcategorychild data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateSubCategoryChildInput(req.body,req.user);
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
            categoryID   :   req.body.categoryID,
            subcategoryID   :   req.body.subcategoryID,
            subCategoryChildName :   req.body.subCategoryChildName,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id,
        };
        SubCategoryChild.findOne({$and:[{categoryID:req.body.categoryID},{subcategoryID:req.body.subcategoryID},{subCategoryChildName:req.body.subCategoryChildName}]})
        .then(result=>{
           if(result){
               errors.subCategoryChildName = 'SubCategory Child Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new SubCategoryChild(insertdata).save().then(subcategorychild=>res.json(subcategorychild));
           }
   
       });
    }

     //STORE TYPE
     if(req.user.userType==='store'){
        const insertdata = {
            photoUrl   :   req.body.photoUrl,
            categoryID   :   req.body.categoryID,
            subcategoryID   :   req.body.subcategoryID,
            subCategoryChildName :   req.body.subCategoryChildName,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id,
        };
        SubCategoryChild.findOne({$and:[{storeID:req.user.id},{subcategoryID:req.body.subcategoryID},{categoryID:req.body.categoryID},{subCategoryChildName:req.body.subCategoryChildName}]})
        .then(result=>{
           if(result){
               errors.subcategorychildName = 'SubCategory Child Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new SubCategoryChild(insertdata).save().then(subcategorychild=>res.json(subcategorychild));
           }
   
       });
    }
    
});

// @route GET  api/subcategorychild/delete
// @desc  Delete subcategorychild by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    SubCategoryChild.remove({_id:req.body.id})
    .then(subcategorychild => {
        if(!subcategorychild){
            errors.subcategorychild = 'SubCategoryChild not found to delete';
            return res.status(404).json(errors);
        }
        res.json(subcategorychild);
    })
    .catch(err=> res.status(404).json({error:"SubCategoryChild Not Found"}));
});

// @route GET  api/subcategorychild/edit
// @desc  Edit subcategorychild by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateSubCategoryChildInput(req.body,req.user);
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
            categoryID   :   req.body.categoryID,
            subcategoryID   :   req.body.subcategoryID,
            subCategoryChildName :   req.body.subCategoryChildName,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id,
        };
      
        SubCategoryChild.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(subcategorychild => {
            if(!subcategorychild){
                errors.subcategorychild = 'subcategorychild not found';
                return res.status(404).json(errors);
            }
            res.json(subcategorychild);
        })
        .catch(err=> res.status(404).json({error:"SubCategoryChild Not Found"}));
    }
    //STORE TYPE
    if(req.user.userType==='store'){
        const editdata = {
            photoUrl   :   req.body.photoUrl,
            categoryID   :   req.body.categoryID,
            subcategoryID   :   req.body.subcategoryID,
            subCategoryChildName :   req.body.subCategoryChildName,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id,
        };
      
        SubCategoryChild.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(subcategorychild => {
            if(!subcategorychild){
                errors.subcategorychild = 'subcategorychild not found';
                return res.status(404).json(errors);
            }
            res.json(subcategorychild);
        })
        .catch(err=> res.status(404).json({error:"SubCategoryChild Not Found"}));
    }
   
        
});


module.exports = router;

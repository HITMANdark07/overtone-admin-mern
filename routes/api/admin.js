const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Load input Validation
const validateAdminRegisterInput = require('../../validation/Admin/register');
const validateAdminRegisterInputAdmin = require('../../validation/Admin/registeradmin');

const validateAdminLoginInput    = require('../../validation/Admin/login');
const validateAdminUpdateInput    = require('../../validation/Admin/updatepassword');
const validateAdminForgetInput    = require('../../validation/Admin/forget');

//Load Admin Model
const Admin = require('../../models/Admin');
require('dotenv').load();

//Imports for Dashboard
const Author = require('../../models/Author');
const Category = require('../../models/Category');
const SubCategory = require('../../models/SubCategory');
const SubCategoryChild = require('../../models/SubCategoryChild');
const Product = require('../../models/Product');
const Slider = require('../../models/Slider');
const Order = require('../../models/Order');
const Role = require('../../models/Role');
const Blog = require('../../models/Blog');







// @route GET  api/admin/test
// @desc  Test users route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Admin Works!!"}));

router.get('/',(req,res)=> {
  Admin.aggregate([
    {
       $lookup:{
          from:"roles",
          foreignField:"_id",
          localField:"roleID",
          as:"role"
       }
    },
    {
       $unwind:"$role"
    },
     { $sort: { date: -1 } },
 ])
  .then(user=>{
      res.json(user)
  })
  .catch(errors=>  res.status(404).json(errors))
});

router.post('/',(req,res)=>{
  const {errors,isValid}= validateAdminRegisterInputAdmin(req.body);

  //Check Validation
  if(!isValid){
      return res.status(400).json(errors);
  }

  Admin.findOne({email:req.body.email})
  .then(admin => {
      if(admin){
        errors.email = 'Email Already Exists';
        return res.status(400).json(errors);
      }
      else{
        const newAdmin = new Admin({
            email: req.body.email,
            name: req.body.name,
            mobile: req.body.mobile,
            password: req.body.password,
            userType:"admin",
            roleID: req.body.roleID,

        });
        bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(newAdmin.password,salt,(err,hash) => {
            if(err) throw err;
            newAdmin.password = hash;
            newAdmin.save()
             .then(admin => {
              const payload = {id: admin.id,name:admin.name,email:admin.email,userType:admin.userType,mobile:admin.mobile};//Create JWT Payload
                  //Sign Token
                  jwt.sign(payload,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                      res.json({
                          success:true,
                          token:'Bearer ' + token
                      })
                  });
             })
             .catch(err => console.log(err));
          })
        })

      }
  })
});


// @route GET  api/user/register
// @desc  Register Admin route
// @access public
router.post('/register',(req,res)=>{
    const {errors,isValid}= validateAdminRegisterInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    Admin.findOne({email:req.body.email})
    .then(admin => {
        if(admin){
          errors.email = 'Email Already Exists';
          return res.status(400).json(errors);
        }
        else{
          const newAdmin = new Admin({
              email: req.body.email,
              name: req.body.name,
              mobile: req.body.mobile,
              password: req.body.password,
              userType: req.body.userType,
          });
          bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newAdmin.password,salt,(err,hash) => {
              if(err) throw err;
              newAdmin.password = hash;
              newAdmin.save()
               .then(admin => {
                const payload = {id: admin.id,name:admin.name,email:admin.email,userType:admin.userType,mobile:admin.mobile};//Create JWT Payload
                    //Sign Token
                    jwt.sign(payload,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                        res.json({
                            success:true,
                            token:'Bearer ' + token
                        })
                    });
               })
               .catch(err => console.log(err));
            })
          })

        }
    })
});

// @route GET  api/admin/login
// @desc  Login user returning JWT token
// @access public
router.post('/login',(req,res)=>{
    const {errors,isValid}= validateAdminLoginInput(req.body);
    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find the user by email
    Admin.findOne({email})
        .then(admin=>{
            //Check for user
            if(!admin){
                errors.email = 'User Not Found';
                return res.status(404).json(errors);
            }
            //Check password
            bcrypt.compare(password,admin.password)
                  .then(async isMatch =>{
                      if(isMatch){
                        var permissionList=null;
                        if(admin.roleID){
                        
                         var  roleResult= await  Role.findOne({_id:admin.roleID});
                         
                         permissionList=JSON.parse(roleResult.permissionList)
                        }
                       
                        //User matched
                        const payload = {id: admin.id,name:admin.name,email:admin.email,userType:admin.userType,mobile:admin.mobile,permissionList:permissionList};//Create JWT Payload
                        //Sign Token
                        jwt.sign(payload,keys.secretOrKey,(err,token)=>{

                            res.json({
                                success:true,
                                token:'Bearer ' + token,
                                payload:payload
                            })
                        });
                      }else{
                        errors.password = 'Password Incorrect';
                        return res.status(400).json(errors);
                      }
                  });
        });
});

// @route GET  api/admin/current
// @desc  Return current Admin user
// @access Private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id: req.user.id,
        name:req.user.name,
        email:req.user.email,
        userType:req.user.userType
    });
});
//update password

router.post('/update',passport.authenticate('jwt',{session:false}),(req,res)=>{

    const {errors,isValid}= validateAdminUpdateInput(req.body);
    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(req.body.password,salt,(err,hash) => {
          if(err) throw err;
          newpassword = hash;
          Admin.findByIdAndUpdate(req.user.id,{password:newpassword})
           .then(user => res.json(user))
           .catch(err => console.log(err));
        })
      })
});


//forgot password
router.post('/forgot',(req,res)=>{
    const {errors,isValid}= validateAdminForgetInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    var secval = Math.floor(1000 + Math.random() * 9000);
    const newUser = new Admin({
     password: secval,
     email:req.body.email
    });

    const email = req.body.email;
    Admin.findOne({email:email})
        .then(user=>{
                //Check for admin user
            if(!user){
                errors.email = 'email not found';
                return res.status(404).json(errors);
        }
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash) => {
              if(err) throw err;
              newpassword = hash;
              User.findOneAndUpdate({email:newUser.email}, { $set: {password: newpassword}})
               .then(user => res.json(user))
               .catch(err => console.log(err));
            })
          })
});

});
router.get('/counter',async (req,res)=>{
    var Count= await Promise.all([
        Store.countDocuments().exec(),
        Category.countDocuments().exec(),
        Product.countDocuments().exec(),
        Slider.countDocuments().exec(),
      ])
      res.json({
        restaurant:Count[0],
        category:Count[1],
        foodItems:Count[2],
        slider:Count[3],
      })
})
router.get('/dashboard',async (req,res)=>{
  var Count= await Promise.all([
        Author.countDocuments().exec(),
        Category.countDocuments().exec(),
        SubCategory.countDocuments().exec(),
        Product.countDocuments().exec(),
        Order.countDocuments().exec(),
        SubCategoryChild.countDocuments().exec(),
        Blog.countDocuments().exec(),
      ])
    //Get Last  Store name
    var authorList =await Author.find().limit(5).sort({date:-1});
    var categoryList =await Category.find().limit(5).sort({date:-1});
    var subCategoryList =await SubCategory.find().limit(5).sort({date:-1});
    var productList=await Product.find().limit(5).sort({date:-1})
    var subCategoryChildList=await SubCategoryChild.find().limit(5).sort({date:-1})

      res.json({
          count:{
            author:Count[0],
              category:Count[1],
              subCategory:Count[2],
              product:Count[3],
              order:Count[4],
              subCategoryChild:Count[5],
              blog:Count[6],
          },
          authorList:authorList,
          categoryList:categoryList,
          subCategoryList:subCategoryList,
          productList:productList,
          subCategoryChildList:subCategoryChildList
      })
})

router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

  const {errors, isValid} = validateAdminRegisterInputAdmin(req.body);
  //Check Validation
  if(!isValid){
      //if Any errors, send 400 with errors object
      return res.status(400).json(errors);
  }

  // const editdata = {
  //     name   :   req.body.name,
  //     description :   req.body.description,
  //     image :   req.body.image,
  //     cost :   req.body.cost,  
  // };

  Admin.findOneAndUpdate({_id:req.body._id},{$set: req.body},{new: true})
  .then(agents => {
      if(!agents){
          errors.agents = 'User not found';
          return res.status(404).json(errors);
      }
      res.json(agents);
  })
  .catch(err=> res.status(404).json({error:"User Not Found"}));
      
});

module.exports = router;

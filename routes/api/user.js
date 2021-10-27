const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('327370AYi7chNGe5ea51d09P1', 'DLABS OTP for your account  {{otp}}');
const otpRegister = new SendOtp('327370AYi7chNGe5ea51d09P1', 'DLABS OTP for your account {{otp}}');

//Load input Validation
const validateRegisterInput = require('../../validation/User/register');
const validateEditInput = require('../../validation/User/edit');
const validateUserLoginInput    = require('../../validation/User/login');
const validateUpdateInput    = require('../../validation/User/updatepassword');
const validateForgetInput    = require('../../validation/User/forget');
const validateverifyInput    = require('../../validation/User/verify');
const validateUserInput    = require('../../validation/User/UserValidation');

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
    user:'tekycodz@gmail.com', // generated ethereal user
    pass: 'codz$321teky' // generated ethereal password
    }
});
const {OAuth2Client} = require('google-auth-library');
const appleSignin = require("apple-signin");

//Load User Model
const User = require('../../models/User');

const OAuthClient = require('intuit-oauth');
require('dotenv').load();

// @route GET  api/users/test
// @desc  Test users route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Users Works!!"}));

router.post('/customer-create',async (req,res)=> {
    var quickAuthToken;
    var getSetting=await Setting.findOne();
    if(getSetting){
        quickAuthToken=JSON.parse(getSetting.quickBook);
    }
    let oauthClientOrder = new OAuthClient({
        clientId: 'AB2T4UWnpedrpGq33wumOOGMzsG92cTzfytneE8xmJwwS1CtuP',
        clientSecret: 'jMywcYPlGTGA9Fd1Lt1eWbLQXJ5Tx19JbL4VBRC0',
        environment: 'sandbox',
        redirectUri: 'http://ec2-3-239-208-80.compute-1.amazonaws.com:5000/admin/quickbook/callback',
        //redirectUri: 'http://localhost:3000/admin/quickbook/callback',
        token: quickAuthToken,
      });
      if (!oauthClientOrder.isAccessTokenValid()) {
            oauthClientOrder
            .refresh()
            .then(async function (authResponse) {
                oauthClientOrder = new OAuthClient({
                    clientId: 'AB2T4UWnpedrpGq33wumOOGMzsG92cTzfytneE8xmJwwS1CtuP',
                    clientSecret: 'jMywcYPlGTGA9Fd1Lt1eWbLQXJ5Tx19JbL4VBRC0',
                    environment: 'sandbox',
                    redirectUri: 'http://ec2-3-239-208-80.compute-1.amazonaws.com:5000/admin/quickbook/callback',
                    //redirectUri: 'http://localhost:3000/admin/quickbook/callback',
                    token: authResponse.token,
                });
                
            })
            .catch(function (e) {
            
            });
      }

      const PrimaryEmailAddr={
        Address: req.body.email,
      };const PrimaryPhone={
        FreeFormNumber: req.body.mobile,
      };
      const BillAddr={
        CountrySubDivisionCode: "CA", 
        City: "Mountain View", 
        PostalCode: "94042", 
        Line1: "123 Main Street", 
        Country: "USA",
      };


    const insertdata = {

            FullyQualifiedName :   req.body.name,
            PrimaryEmailAddr :  PrimaryEmailAddr,
            PrimaryPhone :  PrimaryPhone,
            Suffix:  req.body.name, 
            Title:  req.body.name, 
            MiddleName:  req.body.name, 
            Notes:  req.body.name, 
            FamilyName:  req.body.name,
            BillAddr:BillAddr,
            CompanyName:  req.body.name, 
  
            GivenName: req.body.name,
           
      };

        oauthClientOrder
        .makeApiCall({
        url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365177497720/customer?minorversion=40',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(insertdata),
        })
        .then(function (response) {
            console.log(response);
            
            var customerJSON=response.getJson();
            var quickBookCustomer=JSON.parse(customerJSON.Customer);
            res.json({
                qbid:quickBookCustomerID,
                id:quickBookCustomer.Id
            })
            console.log("payload",customerJSON,quickBookCustomerID)  
        
        })
        .catch(function (e) {
            res.status(400).json(e)
       
        });
});


router.get('/',(req,res)=> {
    User.find()
    .then(user=>{
        res.json(user)
    })
    .catch(errors=>  res.status(404).json(errors))
});

router.get('/getuser',passport.authenticate('jwt',{session:false}),(req,res)=> {
    User.findOne({_id:req.user.id})
    .then(user=>{
        res.json(user)
    })
    .catch(errors=>  res.status(404).json(errors))
});

router.post('/updateProfile',passport.authenticate('jwt',{session:false}),(req,res)=> {

    User.findOneAndUpdate({_id:req.user.id},{$set: req.body},{new: true})
    .then(user => {
        res.json(user);
    })
    .catch(err=> res.status(404).json({error:"User Not Found"}));
});

router.post('/register',async (req,res)=>{
    const {errors,isValid}= validateUserInput(req.body);
      
      //Check Validation
      if(!isValid){
          return res.status(400).json(errors);
      }
  
      User.findOne({email:req.body.email})
      .then(async user => {
          if(user){
            errors.email = 'Email Already Exists';
            return res.status(400).json(errors);
          }
          else{
              //QUICK BOOK INTEGRATION PART
              var quickAuthToken;
              var getSetting=await Setting.findOne();
              if(getSetting){
                  quickAuthToken=JSON.parse(getSetting.quickBook);
              }
              let oauthClientOrder = new OAuthClient({
                  clientId: 'AB2T4UWnpedrpGq33wumOOGMzsG92cTzfytneE8xmJwwS1CtuP',
                  clientSecret: 'jMywcYPlGTGA9Fd1Lt1eWbLQXJ5Tx19JbL4VBRC0',
                  environment: 'sandbox',
                  redirectUri: 'http://ec2-3-239-208-80.compute-1.amazonaws.com:5000/admin/quickbook/callback',
                  //redirectUri: 'http://localhost:3000/admin/quickbook/callback',
                  token: quickAuthToken,
                });
                if (!oauthClientOrder.isAccessTokenValid()) {
                      oauthClientOrder
                      .refresh()
                      .then(async function (authResponse) {
                          oauthClientOrder = new OAuthClient({
                              clientId: 'AB2T4UWnpedrpGq33wumOOGMzsG92cTzfytneE8xmJwwS1CtuP',
                              clientSecret: 'jMywcYPlGTGA9Fd1Lt1eWbLQXJ5Tx19JbL4VBRC0',
                              environment: 'sandbox',
                              redirectUri: 'http://ec2-3-239-208-80.compute-1.amazonaws.com:5000/admin/quickbook/callback',
                              //redirectUri: 'http://localhost:3000/admin/quickbook/callback',
                              token: authResponse.token,
                          });
                          
                      })
                      .catch(function (e) {
                        errors.email = 'Error Occured in Server Contact Admin';
                        return res.status(400).json(errors);
                      });
                }
          
                const PrimaryEmailAddr={
                  Address: req.body.email,
                };const PrimaryPhone={
                  FreeFormNumber: req.body.mobile,
                };
                const BillAddr={
                  CountrySubDivisionCode: "CA", 
                  City: "Mountain View", 
                  PostalCode: "94042", 
                  Line1: "123 Main Street", 
                  Country: "USA",
                };
          
          
              const insertdata = {
          
                      FullyQualifiedName :   req.body.name,
                      PrimaryEmailAddr :  PrimaryEmailAddr,
                      PrimaryPhone :  PrimaryPhone,
                      Suffix:  req.body.name, 
                      Title:  req.body.name, 
                      MiddleName:  req.body.name, 
                      Notes:  req.body.name, 
                      FamilyName:  req.body.name,
                      BillAddr:BillAddr,
                      CompanyName:  req.body.name, 
            
                      GivenName: req.body.name,
                     
                };
          
                  oauthClientOrder
                  .makeApiCall({
                  url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365177497720/customer?minorversion=40',
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(insertdata),
                  })
                  .then(function (response) {
                      var customerJSON=response.getJson();
                      var quickBookCustomerID=customerJSON.Customer;
                      console.log("payload",customerJSON,quickBookCustomerID)  

                      const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        mobile: req.body.mobile,
                        password: req.body.password,
                        photo: req.body.photo,
                        origin: 'local',
                        quickbookID:quickBookCustomerID.Id
                    });  
                    bcrypt.genSalt(10,(err,salt)=>{
                        bcrypt.hash(newUser.password,salt,(err,hash) => {
                          if(err) throw err;
                          newUser.password = hash;
                          newUser.save()
                           .then(user => {
                            const payload = {id: user.id,name:user.name,email:user.email,userType:'user',mobile:user.mobile,photo:user.photo,quickbookID:user.quickbookID};//Create JWT Payload
                             console.log("payload",payload)  
                            //Sign Token
                                jwt.sign(payload,keys.secretOrKey,async (err,token)=>{
                                  
                                    res.json({
                                        success:true,
                                        token:'Bearer ' + token,
                                        payload:payload,
                                    })
                                });
                           })
                           .catch(err => console.log(err));
                        })
                    })
                    //   console.log(response);
                    //   res.json(response.getJson())
                  
                  })
                  .catch(function (e) {
                    errors.email = 'Error Occured in Server Contact Admin';
                    return res.status(400).json(errors);
    
                  });

          
           
         }
      })
  });

router.post('/login',(req,res)=>{
    const {errors,isValid}= validateUserLoginInput(req.body);
    // Check Validation
     if(!isValid){
        return res.status(400).json(errors);
    }
 
     const email = req.body.emailLogin;
     const password = req.body.passwordLogin;
 
     //Find the user by email
     User.findOne({$or:[{email},{name:email}]})
         .then(user=>{
             //Check for user
             if(!user){
                 errors.emailLogin = 'User Not Found';
                 return res.status(404).json(errors);
             }
             //Check password
             bcrypt.compare(password,user.password)
             .then(isMatch =>{
                 if(isMatch){
                 //User matched
                 const payload = {id: user.id,name:user.name,email:user.email,userType:'user',mobile:user.mobile,photo:user.photo,quickbookID:user.quickbookID};//Create JWT Payload
                 //Sign Token
                 jwt.sign(payload,keys.secretOrKey,(err,token)=>{
                     res.json({
                         success:true,
                         token:'Bearer ' + token,
                         payload:payload
                     })
                 });
                 }else{
                 errors.passwordLogin = 'Password Incorrect';
                 return res.status(400).json(errors);
                 }
             });
     });         
 });

 router.post('/facebooklogin',async (req,res)=>{
     var errors={}
    User.findOne({email:req.body.email})
    .then(async user => {
        if(user){
            const payload = {id: user.id,name:user.name,email:user.email,userType:'user',mobile:user.mobile,photo:user.photo,quickbookID:user.quickbookID};//Create JWT Payload
            //Sign Token
            jwt.sign(payload,keys.secretOrKey,(err,token)=>{
                res.json({
                    success:true,
                    token:'Bearer ' + token,
                    payload:payload
                })
            });
        }
        else{
            //QUICK BOOK INTEGRATION PART
            var quickAuthToken;
            var getSetting=await Setting.findOne();
            if(getSetting){
                quickAuthToken=JSON.parse(getSetting.quickBook);
            }
            let oauthClientOrder = new OAuthClient({
                clientId: 'AB2T4UWnpedrpGq33wumOOGMzsG92cTzfytneE8xmJwwS1CtuP',
                clientSecret: 'jMywcYPlGTGA9Fd1Lt1eWbLQXJ5Tx19JbL4VBRC0',
                environment: 'sandbox',
                redirectUri: 'http://ec2-3-239-208-80.compute-1.amazonaws.com:5000/admin/quickbook/callback',
                //redirectUri: 'http://localhost:3000/admin/quickbook/callback',
                token: quickAuthToken,
              });
              if (!oauthClientOrder.isAccessTokenValid()) {
                    oauthClientOrder
                    .refresh()
                    .then(async function (authResponse) {
                        oauthClientOrder = new OAuthClient({
                            clientId: 'AB2T4UWnpedrpGq33wumOOGMzsG92cTzfytneE8xmJwwS1CtuP',
                            clientSecret: 'jMywcYPlGTGA9Fd1Lt1eWbLQXJ5Tx19JbL4VBRC0',
                            environment: 'sandbox',
                            redirectUri: 'http://ec2-3-239-208-80.compute-1.amazonaws.com:5000/admin/quickbook/callback',
                           // redirectUri: 'http://localhost:3001/admin/quickbook/callback',
                            token: authResponse.token,
                        });
                        
                    })
                    .catch(function (e) {
                        console.log("e",e);
                      errors.email = 'Error Occured in Server Contact Admin';
                      return res.status(400).json(errors);
                    });
              }
        
              const PrimaryEmailAddr={
                Address: req.body.email,
              };const PrimaryPhone={
                FreeFormNumber: req.body.mobile,
              };
              const BillAddr={
                CountrySubDivisionCode: "CA", 
                City: "Mountain View", 
                PostalCode: "94042", 
                Line1: "123 Main Street", 
                Country: "USA",
              };
        
        
            const insertdata = {
        
                    FullyQualifiedName :   req.body.name,
                    PrimaryEmailAddr :  PrimaryEmailAddr,
                    PrimaryPhone :  PrimaryPhone,
                    Suffix:  req.body.name, 
                    Title:  req.body.name, 
                    MiddleName:  req.body.name, 
                    Notes:  req.body.name, 
                    FamilyName:  req.body.name,
                    BillAddr:BillAddr,
                    CompanyName:  req.body.name, 
          
                    GivenName: req.body.name,
                   
              };
        
                oauthClientOrder
                .makeApiCall({
                url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365177497720/customer?minorversion=40',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(insertdata),
                })
                .then(function (response) {
                    var customerJSON=response.getJson();
                    var quickBookCustomerID=customerJSON.Customer;
                    console.log("payload",customerJSON,quickBookCustomerID)  

                    const newUser = new User({
                      name: req.body.name,
                      email: req.body.email,
                      mobile: req.body.mobile,
                      password: req.body.password,
                      photo: req.body.photo,
                      origin: 'facebook',
                      quickbookID:quickBookCustomerID.Id
                  });  
                  bcrypt.genSalt(10,(err,salt)=>{
                      bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                         .then(user => {
                          const payload = {id: user.id,name:user.name,email:user.email,userType:'user',mobile:user.mobile,photo:user.photo,quickbookID:user.quickbookID};//Create JWT Payload
                           console.log("payload",payload)  
                          //Sign Token
                              jwt.sign(payload,keys.secretOrKey,async (err,token)=>{
                                
                                  res.json({
                                      success:true,
                                      token:'Bearer ' + token,
                                      payload:payload,
                                  })
                              });
                         })
                         .catch(err => console.log(err));
                      })
                  })
                  //   console.log(response);
                  //   res.json(response.getJson())
                
                })
                .catch(function (e) {
                  errors.email = 'Error Occured in Server Contact Admin';
                  return res.status(400).json(errors);
  
                });
       }

 })

 })
 router.post('/googlelogin',async (req,res)=>{
 
    User.findOne({email:req.body.email})
    .then(user => {
        if(user){
            const payload = {id: user.id,name:user.name,email:user.email,userType:'user',mobile:user.mobile,photo:user.photo};//Create JWT Payload
            //Sign Token
            jwt.sign(payload,keys.secretOrKey,(err,token)=>{
                res.json({
                    success:true,
                    token:'Bearer ' + token,
                    payload:payload
                })
            });
        }
        else{
          const newUser = new User({
              name: req.body.displayName,
              email: req.body.email,
              mobile: req.body.mobile,
              password: req.body.id,
              photo: req.body.photoUrl,
              origin: 'google',

          });  
          bcrypt.genSalt(10,(err,salt)=>{
              bcrypt.hash(newUser.password,salt,(err,hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                 .then(user => {
                  const payload = {id: user.id,name:user.name,email:user.email,userType:'user',mobile:user.mobile,photo:user.photo};//Create JWT Payload
                      //Sign Token
                      jwt.sign(payload,keys.secretOrKey,async (err,token)=>{
                        //let testAccount = await nodemailer.createTestAccount();
                        //   let transporter = nodemailer.createTransport({
                        //       host: "smtp.gmail.com",
                        //       port: 587,
                        //       secure: false, // true for 465, false for other ports
                        //       service: 'gmail',
                        //       auth: {
                        //         user:'tekycodz@gmail.com', // generated ethereal user
                        //         pass: 'codz$321teky' // generated ethereal password
                        //       }
                        //     });
                          
                        //     // send mail with defined transport object
                        //     let info = await transporter.sendMail({
                        //       from: '"SMEJ" <info@smej.com>', // sender address
                        //       to: req.body.email, // list of receivers
                        //       subject: "OTP for Your Account", // Subject line
                        //       text: `${req.body.otp} is OTP for Registered Account`, // plain text body
                        //     });
                          res.json({
                              success:true,
                              token:'Bearer ' + token,
                              payload:payload,
                          })
                      });
                 })
                 .catch(err => console.log(err));
              })
          })
         
       }
    })

})
router.post('/applelogin',async (req,res)=>{

    User.findOne({email:req.body.email})
    .then(user => {
        if(user){
            const payload = {id: user.id,name:user.name,email:user.email,userType:'user',mobile:user.mobile,photo:user.photo};//Create JWT Payload
            //Sign Token
            jwt.sign(payload,keys.secretOrKey,(err,token)=>{
                res.json({
                    success:true,
                    token:'Bearer ' + token,
                    payload:payload
                })
            });
        }
        else{
          const newUser = new User({
              name: req.body.displayName,
              email: req.body.email,
              mobile: req.body.mobile,
              password: req.body.id,
              photo: req.body.photoUrl,
              origin: 'apple',

          });  
          bcrypt.genSalt(10,(err,salt)=>{
              bcrypt.hash(newUser.password,salt,(err,hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                 .then(user => {
                  const payload = {id: user.id,name:user.name,email:user.email,userType:'user',mobile:user.mobile,photo:user.photo};//Create JWT Payload
                      //Sign Token
                      jwt.sign(payload,keys.secretOrKey,async (err,token)=>{
                          //let testAccount = await nodemailer.createTestAccount();
                          let transporter = nodemailer.createTransport({
                              host: "smtp.gmail.com",
                              port: 587,
                              secure: false, // true for 465, false for other ports
                              service: 'gmail',
                              auth: {
                                user:'tekycodz@gmail.com', // generated ethereal user
                                pass: 'codz$321teky' // generated ethereal password
                              }
                            });
                          
                            // send mail with defined transport object
                            let info = await transporter.sendMail({
                              from: '"SMEJ" <info@smej.com>', // sender address
                              to: req.body.email, // list of receivers
                              subject: "OTP for Your Account", // Subject line
                              text: `${req.body.otp} is OTP for Registered Account`, // plain text body
                            });
                          res.json({
                              success:true,
                              token:'Bearer ' + token,
                              payload:payload,
                          })
                      });
                 })
                 .catch(err => console.log(err));
              })
          })
         
       }
    })

})
 




 


// @route GET  api/user/current
// @desc  Return current user
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

    const {errors,isValid}= validateUpdateInput(req.body);
    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(req.body.password,salt,(err,hash) => {
          if(err) throw err;
          newpassword = hash;
          User.findByIdAndUpdate(req.user.id,{password:newpassword})
           .then(user => res.json(user))
           .catch(err => console.log(err));
        })
      })
});


//forgot password
router.post('/forgot',(req,res)=>{
    const {errors,isValid}= validateForgetInput(req.body);
    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    var secval = Math.floor(1000 + Math.random() * 9000);
    console.log("secval",secval);
    const newUser = new User({
     password: secval,
     email:req.body.emailLogin
    });
    const emailLogin = req.body.emailLogin;
    User.findOne({email:emailLogin})
        .then(user=>{
                //Check for user
            if(!user){
                errors.emailLogin = 'Email not found';
                return res.status(404).json(errors);
            }
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash) => {
          if(err) throw err;
          newpassword = hash;
          User.findOneAndUpdate({email:newUser.email}, { $set: {password: newpassword}})
           .then(async user =>{
            var htmlData=`<!doctype html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Simple Transactional Email</title>
                <style>
                  /* -------------------------------------
                      GLOBAL RESETS
                  ------------------------------------- */
                  img {
                    border: none;
                    -ms-interpolation-mode: bicubic;
                    max-width: 100%; }
            
                  body {
                    background-color: #f6f6f6;
                    font-family: sans-serif;
                    -webkit-font-smoothing: antialiased;
                    font-size: 14px;
                    line-height: 1.4;
                    margin: 0;
                    padding: 0;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%; }
            
                  table {
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%; }
                    table td {
                      font-family: sans-serif;
                      font-size: 14px;
                      vertical-align: top; }
            
                  /* -------------------------------------
                      BODY & CONTAINER
                  ------------------------------------- */
            
                  .body {
                    background-color: #f6f6f6;
                    width: 100%; }
            
                  /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                  .container {
                    display: block;
                    margin: 0 auto !important;
                    /* makes it centered */
                    max-width: 580px;
                    padding: 10px;
                    width: 580px; }
            
                  /* This should also be a block element, so that it will fill 100% of the .container */
                  .content {
                    box-sizing: border-box;
                    display: block;
                    margin: 0 auto;
                    max-width: 580px;
                    padding: 10px; }
            
                  /* -------------------------------------
                      HEADER, FOOTER, MAIN
                  ------------------------------------- */
                  .main {
                    background: #ffffff;
                    border-radius: 3px;
                    width: 100%; }
            
                  .wrapper {
                    box-sizing: border-box;
                    padding: 20px; }
            
                  .content-block {
                    padding-bottom: 10px;
                    padding-top: 10px;
                  }
            
                  .footer {
                    clear: both;
                    margin-top: 10px;
                    text-align: center;
                    width: 100%; }
                    .footer td,
                    .footer p,
                    .footer span,
                    .footer a {
                      color: #999999;
                      font-size: 12px;
                      text-align: center; }
            
                  /* -------------------------------------
                      TYPOGRAPHY
                  ------------------------------------- */
                  h1,
                  h2,
                  h3,
                  h4 {
                    color: #000000;
                    font-family: sans-serif;
                    font-weight: 400;
                    line-height: 1.4;
                    margin: 0;
                    margin-bottom: 30px; }
            
                  h1 {
                    font-size: 35px;
                    font-weight: 300;
                    text-align: center;
                    text-transform: capitalize; }
            
                  p,
                  ul,
                  ol {
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: normal;
                    margin: 0;
                    margin-bottom: 15px; }
                    p li,
                    ul li,
                    ol li {
                      list-style-position: inside;
                      margin-left: 5px; }
            
                  a {
                    color: #3498db;
                    text-decoration: underline; }
            
                  /* -------------------------------------
                      BUTTONS
                  ------------------------------------- */
                  .btn {
                    box-sizing: border-box;
                    width: 100%; }
                    .btn > tbody > tr > td {
                      padding-bottom: 15px; }
                    .btn table {
                      width: auto; }
                    .btn table td {
                      background-color: #ffffff;
                      border-radius: 5px;
                      text-align: center; }
                    .btn a {
                      background-color: #ffffff;
                      border: solid 1px #3498db;
                      border-radius: 5px;
                      box-sizing: border-box;
                      color: #3498db;
                      cursor: pointer;
                      display: inline-block;
                      font-size: 14px;
                      font-weight: bold;
                      margin: 0;
                      padding: 12px 25px;
                      text-decoration: none;
                      text-transform: capitalize; }
            
                  .btn-primary table td {
                    background-color: #3498db; }
            
                  .btn-primary a {
                    background-color: #3498db;
                    border-color: #3498db;
                    color: #ffffff; }
            
                  /* -------------------------------------
                      OTHER STYLES THAT MIGHT BE USEFUL
                  ------------------------------------- */
                  .last {
                    margin-bottom: 0; }
            
                  .first {
                    margin-top: 0; }
            
                  .align-center {
                    text-align: center; }
            
                  .align-right {
                    text-align: right; }
            
                  .align-left {
                    text-align: left; }
            
                  .clear {
                    clear: both; }
            
                  .mt0 {
                    margin-top: 0; }
            
                  .mb0 {
                    margin-bottom: 0; }
            
                  .preheader {
                    color: transparent;
                    display: none;
                    height: 0;
                    max-height: 0;
                    max-width: 0;
                    opacity: 0;
                    overflow: hidden;
                    mso-hide: all;
                    visibility: hidden;
                    width: 0; }
            
                  .powered-by a {
                    text-decoration: none; }
            
                  hr {
                    border: 0;
                    border-bottom: 1px solid #f6f6f6;
                    Margin: 20px 0; }
            
                  /* -------------------------------------
                      RESPONSIVE AND MOBILE FRIENDLY STYLES
                  ------------------------------------- */
                  @media only screen and (max-width: 620px) {
                    table[class=body] h1 {
                      font-size: 28px !important;
                      margin-bottom: 10px !important; }
                    table[class=body] p,
                    table[class=body] ul,
                    table[class=body] ol,
                    table[class=body] td,
                    table[class=body] span,
                    table[class=body] a {
                      font-size: 16px !important; }
                    table[class=body] .wrapper,
                    table[class=body] .article {
                      padding: 10px !important; }
                    table[class=body] .content {
                      padding: 0 !important; }
                    table[class=body] .container {
                      padding: 0 !important;
                      width: 100% !important; }
                    table[class=body] .main {
                      border-left-width: 0 !important;
                      border-radius: 0 !important;
                      border-right-width: 0 !important; }
                    table[class=body] .btn table {
                      width: 100% !important; }
                    table[class=body] .btn a {
                      width: 100% !important; }
                    table[class=body] .img-responsive {
                      height: auto !important;
                      max-width: 100% !important;
                      width: auto !important; }}
            
                  /* -------------------------------------
                      PRESERVE THESE STYLES IN THE HEAD
                  ------------------------------------- */
                  @media all {
                    .ExternalClass {
                      width: 100%; }
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                      line-height: 100%; }
                    .apple-link a {
                      color: inherit !important;
                      font-family: inherit !important;
                      font-size: inherit !important;
                      font-weight: inherit !important;
                      line-height: inherit !important;
                      text-decoration: none !important; }
                    .btn-primary table td:hover {
                      background-color: #34495e !important; }
                    .btn-primary a:hover {
                      background-color: #34495e !important;
                      border-color: #34495e !important; } }
            
                </style>
              </head>
              <body class="">
                <table border="0" cellpadding="0" cellspacing="0" class="body">
                  <tr>
                    <td>&nbsp;</td>
                    <td class="container">
                      <div class="content">
            
                        <!-- START CENTERED WHITE CONTAINER -->
                        <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
                        <table class="main">
            
                          <!-- START MAIN CONTENT AREA -->
                          <tr>
                            <td class="wrapper">
                              <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td>
                                    <p>Hi there,</p>
                                    <p>Your Temporary Password</p>
                                    <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                      <tbody>
                                        <tr>
                                          <td align="left">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                              <tbody>
                                                <tr>
                                                  <td> <a href="javascript:void(0);" target="_blank">${secval}</a> </td>
                                                
                                                </tr>
                                               
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
            
                        <!-- END MAIN CONTENT AREA -->
                        </table>
            
                        <!-- START FOOTER -->
                        <div class="footer">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td class="content-block">
                                <span class="apple-link">Overtone Acoustics</span>
                                <br> Don't like these emails? <a href="#">Unsubscribe</a>.
                              </td>
                            </tr>
                            
                          </table>
                        </div>
                        <!-- END FOOTER -->
            
                      <!-- END CENTERED WHITE CONTAINER -->
                      </div>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                </table>
            
               
            
               
              </body>
            </html>`
            // send mail with defined transport object
             let info = await transporter.sendMail({
                 from: 'Overtone Acoustics', // sender address
                 to: newUser.email, // list of receivers
                 subject: "Your New Password", // Subject line
                 html: htmlData, // plain text body
             });
              console.log("infor,",info)
            res.json(user)
           } )
           .catch(err => console.log(err));
        })
      })
});

});



router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateEditInput(req.body);
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
  
    User.findOneAndUpdate({_id:req.body._id},{$set: req.body},{new: true})
    .then(agents => {
        if(!agents){
            errors.agents = 'User not found';
            return res.status(404).json(errors);
        }
        res.json(agents);
    })
    .catch(err=> res.status(404).json({error:"User Not Found"}));
        
});

router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    User.remove({_id:req.body.id})
    .then(agent => {
        if(!agent){
            errors.agent = 'User not found to delete';
            return res.status(404).json(errors);
        }
        res.json(agent);
    })
    .catch(err=> res.status(404).json({error:"User Not Found"}));
});


module.exports = router;

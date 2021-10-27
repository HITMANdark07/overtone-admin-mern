const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require("nodemailer");

//Load input Validation
const validateSettingInput = require('../../validation/Setting/SettingValidation');

//Load Setting Model
const Setting = require('../../models/Setting');

//Load category Model
const Category = require('../../models/Category');

//Load SubCategory Model
const SubCategory = require('../../models/SubCategory');

//Load SubCategory Model
const SubCategoryChild = require('../../models/SubCategoryChild');

//Load blog Model
const Blog = require('../../models/Blog');

//Load Product Model
const Product = require('../../models/Product');

// @route GET  api/setting/test
// @desc  Test Setting route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Setting Works!!"}));

// @route GET  api/setting/
// @desc  Get All setting
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    Setting.findOne()
    .then(setting => {
        if(!setting){
            errors.setting = 'Setting Not Found';
            return res.status(404).json(errors);
        }
        res.json(setting);
    })
    .catch(err=> res.status(404).json({error:"Setting Not Found"}));
});

// @route POST  api/setting/
// @desc  Create setting data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateSettingInput(req.body);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    const insertdata = {
        applicationName   :   req.body.applicationName,
        applicationEmail :   req.body.applicationEmail,
        logoUrl :   req.body.logoUrl,
        currency :   req.body.currency, 
        contactNo :   req.body.contactNo, 
        address :   req.body.address, 
        homebgUrl :   req.body.homebgUrl, 
        homeTitle :   req.body.homeTitle, 
        homePara :   req.body.homePara, 
        homeBtnText :   req.body.homeBtnText, 
        homeBtnPath :   req.body.homeBtnPath,
        aboutHeading :   req.body.aboutHeading,
        aboutPara :   req.body.aboutPara,
        aboutCoverUrl :   req.body.aboutCoverUrl,
        aboutVideoUrl :   req.body.aboutVideoUrl,
        clientList :   req.body.clientList,
        featurebgUrl :   req.body.featurebgUrl,
        featureTitle :   req.body.featureTitle,
        featurePara :   req.body.featurePara,
        featureList :   req.body.featureList,
        bannerBgUrl :   req.body.bannerBgUrl,
        bannerText :   req.body.bannerText,
        bannerPara :   req.body.bannerPara,
        bannerBtnText :   req.body.bannerBtnText,
        bannerBtnPath :   req.body.bannerBtnPath,
        hashtag :   req.body.hashtag,
        hashImageList :   req.body.hashImageList,
        footerText :   req.body.footerText,
        contactText :   req.body.contactText,
        socialLinksList :   req.body.socialLinksList,
    };

    Setting.findOne({_id:req.body._id})
     .then(result=>{
        if(result){
            Setting.findOneAndUpdate({_id:req.body._id},{$set: insertdata},{new: true})
            .then(setting => {
                if(!setting){
                    errors.setting = 'Setting not found';
                    return res.status(404).json(errors);
                }
                res.json(setting);
            })
            .catch(err=> res.status(404).json({error:"Setting Not Found"}));
        }
        else{
            new Setting(insertdata).save().then(setting=>res.json(setting)); 
        }

    });
});

// @route GET  api/setting/delete
// @desc  Delete setting by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Setting.remove({_id:req.body.id})
    .then(setting => {
        if(!setting){
            errors.setting = 'Setting not found to delete';
            return res.status(404).json(errors);
        }
        res.json(setting);
    })
    .catch(err=> res.status(404).json({error:"Setting Not Found"}));
});



router.post('/newsletter',async (req,res) => {
    var settingContent={};
    settingContent= await Setting.findOne();
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
        from: '"New User" <info@smej.com>', // sender address
        to: settingContent.applicationEmail, // list of receivers
        subject: "New NewsLetter", // Subject line
        text: `Email:${req.body.email}`, // plain text body
      });
      try{
       return res.json(info)
      }catch(err){
        return res.status(400).json({error:"Error Occured Try Again"})
      }
})

router.get('/home',async (req,res) => {
    //INITIALIZE VARIABLE
    var settingContent={};
    var categoryContent=[];
    var caseContent=[];
    var subcategoryContent=[];
    var subcategoryContentChild=[];
    var footerContent1=[];
    var footerContent2=[];

  //Get Category ID
  var catID= await Category.findOne({categoryName:/^MARKETPLACE$/i});
  var solID= await Category.findOne({categoryName:/^SOLUTIONS$/i});

  console.log("catID",catID)
    //SLIDER CONTENT
    settingContent= await Setting.findOne();
    categoryContent =await Category.find({isEnabled:'Yes'});
    subcategoryContent=await SubCategory.find({isEnabled:'Yes'});
    subcategoryContentChild =await SubCategoryChild.find({isEnabled:'Yes'});
    caseContent =await Blog.find({$and:[{visiblity:'visible'},{blogType:'case'}]}).sort({date:-1});
    footerContent1= await  SubCategory.find({$and:[{isEnabled:'Yes',categoryID:catID._id}]}).sort({date:-1}).limit(4);
   footerContent2= await  SubCategory.find({$and:[{isEnabled:'Yes'},{ categoryID: solID._id }]}).limit(4);
    res.json({
        setting:settingContent,
        category:categoryContent,
        subcategory:subcategoryContent,
        subcategoryChild:subcategoryContentChild,
        casestudy:caseContent, 
        footer1:footerContent1,
        footer2:footerContent2,
        catID:catID
    });

});

module.exports = router;

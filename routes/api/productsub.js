const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load input Validation
const validateProductSubInput = require('../../validation/ProductSub/ProductSubValidation');

//Load ProductSub Model
const ProductSub = require('../../models/ProductSub');

//Load Setting Model
const Setting = require('../../models/Setting');

//QUICKBOOK OAUTH
const OAuthClient = require('intuit-oauth');
var oauthClient = new OAuthClient({
    clientId: 'AB2T4UWnpedrpGq33wumOOGMzsG92cTzfytneE8xmJwwS1CtuP',
    clientSecret: 'jMywcYPlGTGA9Fd1Lt1eWbLQXJ5Tx19JbL4VBRC0',
    environment: 'sandbox',
   redirectUri: 'http://ec2-3-239-208-80.compute-1.amazonaws.com:5000/admin/quickbook/callback',
    //redirectUri: 'http://localhost:3000/admin/quickbook/callback',

});

var oauth2_token_json = null;

// @route GET  api/productsub/test
// @desc  Test ProductSub route
// @access public
router.get('/test',(req,res)=> res.json({msg: "ProductSub Works!!"}));


router.get('/quickbook/getredirect',async (req,res)=> {
    // AuthorizationUri
    const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
        state: 'testState',
    }); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}
    
    // Redirect the authUri
    console.log("authURI",authUri)
    res.json({url:authUri}); 
})

router.get('/quickbook/tokenisvalid',async (req,res)=> {
    //setting Modal
    var getSetting=await Setting.findOne();
   
    if (!oauthClient.isAccessTokenValid()) {
        oauthClient
          .refresh()
          .then(async function (authResponse) {
            oauthClient = new OAuthClient({
                clientId: 'AB2T4UWnpedrpGq33wumOOGMzsG92cTzfytneE8xmJwwS1CtuP',
                clientSecret: 'jMywcYPlGTGA9Fd1Lt1eWbLQXJ5Tx19JbL4VBRC0',
                environment: 'sandbox',
               redirectUri: 'http://ec2-3-239-208-80.compute-1.amazonaws.com:5000/admin/quickbook/callback',
               //redirectUri: 'http://localhost:3000/admin/quickbook/callback',
                token: authResponse.token,
              });
              var updateSetting= await Setting.findOneAndUpdate({_id:getSetting._id},{$set: {quickBook:JSON.stringify(authResponse.token)}},{new: true});
              res.json({login:true})
            
          })
          .catch(function (e) {
            res.json({login:false})
        
          });
      }else{
        res.json({login:true})

      }
})



router.post('/quickbook/createtoken',async (req,res)=> {

            //setting Modal
            var getSetting=await Setting.findOne();

            // Parse the redirect URL for authCode and exchange them for tokens
            const parseRedirect = req.body.url;

            // Exchange the auth code retrieved from the **req.url** on the redirectUri
            oauthClient
            .createToken(parseRedirect)
            .then(async function (authResponse) {
                //oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
                oauthClient = new OAuthClient({
                    clientId: 'AB2T4UWnpedrpGq33wumOOGMzsG92cTzfytneE8xmJwwS1CtuP',
                    clientSecret: 'jMywcYPlGTGA9Fd1Lt1eWbLQXJ5Tx19JbL4VBRC0',
                    environment: 'sandbox',
                    redirectUri: 'http://ec2-3-239-208-80.compute-1.amazonaws.com:5000/admin/quickbook/callback',
                   // redirectUri: 'http://localhost:3000/admin/quickbook/callback',
                    token: authResponse.token,
                });
                var updateSetting= await Setting.findOneAndUpdate({_id:getSetting._id},{$set: {quickBook:JSON.stringify(authResponse.token)}},{new: true});
                res.json({token:authResponse.token})
                console.log('The Token is  ' + JSON.stringify(authResponse.getJson()));
            })
            .catch(function (e) {
                res.status(400).json({error:e.originalMessage})
            });
})

router.get('/quickbook/refreshAccessToken', function (req, res) {
    oauthClient
      .refresh()
      .then(function (authResponse) {
        oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
        res.send(oauth2_token_json);
      })
      .catch(function (e) {
       // console.error(e);
      });
  });

 


router.post('/quickbook/insert', function (req, res) {

    const body = req.body;
    oauthClient
    .makeApiCall({
    url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365177497720/item?minorversion=40',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    })
    .then(function (response) {
        res.json(response)
    
    })
    .catch(function (e) {
        res.status(400).json(e)
   
    });
    
})

router.post('/quickbook/query', function (req, res) {

    const body = req.body.query;
    oauthClient
    .makeApiCall({
    url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365177497720/query?minorversion=40',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body:req.body.query,
    })
    .then(function (response) {
        res.json(response)
    
    })
    .catch(function (e) {
        res.status(400).json(e)
   
    });

})
// @route GET  api/productsub/getproductsub
// @desc  Test ProductSub route
// @access public
router.post('/getproductsub',async (req,res) => {
        ProductSub.find({storeID:req.body.storeID})
        .then(productsub => {
            if(!productsub){
                errors.productsub = 'ProductSub  Not Found';
                return res.status(404).json(errors);
            }
            res.json(productsub);
        })
        .catch(err=> res.status(404).json({error:"ProductSub Not Found"}));
})

// @route GET  api/productsub/
// @desc  Get All productsub
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {

        ProductSub.find({adminID:req.user.id})
        .then(productsub => {
            if(!productsub){
                errors.productsub = 'ProductSub Name Not Found';
                return res.status(404).json(errors);
            }
            res.json(productsub);
        })
        .catch(err=> res.status(404).json({error:"ProductSub Not Found"}));
});


// @route POST  api/productsub/
// @desc  Create productsub data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    // const {errors, isValid} = validateProductSubInput(req.body,req.user);
    // //Check Validation
    // if(!isValid){
    //     //if Any errors, send 400 with errors object
    //     return res.status(400).json(errors);
    // }
  
    const errors={}
    
        const insertdata = {

            productID :   req.body.productID,
            productSubName :   req.body.productSubName,
            saleDesc :   req.body.saleDesc,
            sku :   req.body.sku,
            type :   req.body.type,
            salePrice :   req.body.salePrice,
            taxable :   req.body.taxable,
            incomeAccount :   req.body.incomeAccount,
            purchaseDesc :   req.body.purchaseDesc,
            purchaseCost :   req.body.purchaseCost,
            expenseAccount :   req.body.expenseAccount,
            quantity :   req.body.quantity,
            recorder :   req.body.recorder,
            inventoryAsset :   req.body.inventoryAsset,
            quantityAsDate :   req.body.quantityAsDate,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id, 
        };
        // Body sample from API explorer examples
        const QuickbookData = {
            "TrackQtyOnHand": true, 
            "Name": req.body.productSubName, 
            "QtyOnHand": req.body.quantity, 
            "Sku": req.body.sku,
            "UnitPrice":  req.body.salePrice,
            "IncomeAccountRef": {
              "name": "Sales of Product Income", 
              "value": "79"
            }, 
            "AssetAccountRef": {
              "name": "Inventory Asset", 
              "value": "81"
            }, 
            "InvStartDate": "2015-01-01", 
            "PurchaseCost": req.body.purchaseCost,
            "PurchaseDesc": req.body.purchaseDesc,
            "Type": "Inventory", 
            "ExpenseAccountRef": {
              "name": "Cost of Goods Sold", 
              "value": "80"
            }
          }
         // console.log("QuickbookData",QuickbookData);
        /*{
            "TrackQtyOnHand": true, 
            "Name": req.body.productSubName, 
            "QtyOnHand": req.body.quantity, 
            "IncomeAccountRef": {
              "name":  req.body.incomeAccount, 
              "value": "79"
            }, 
            "AssetAccountRef": {
              "name":  req.body.inventoryAsset, 
              "value": "81"
            }, 
            "InvStartDate": "2015-01-01", 
            "Type": "Inventory", 
            "ExpenseAccountRef": {
              "name": "Cost of Goods Sold", 
              "value": "80"
            }
          }*/
        

        ProductSub.findOne({productSubName:req.body.productSubName})
        .then(result=>{
           if(result){
               errors.productSubName = 'ProductSub Name Already Exists';
               return res.status(404).json(errors);
           }
           else{
               new ProductSub(insertdata).save().then(productsub=>{

                oauthClient
                .makeApiCall({
                url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365177497720/item?minorversion=40',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(QuickbookData),
                })
                .then(function (response) {
                    console.log('The API response is  : ' + response);
                })
                .catch(function (e) {
                    console.log('The error is ' + JSON.stringify(e));
                });

                res.json(productsub)
               });
           }
   
       });
    

    
    
});

// @route GET  api/productsub/delete
// @desc  Delete productsub by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    ProductSub.remove({_id:req.body.id})
    .then(productsub => {
        if(!productsub){
            errors.productsub = 'ProductSub not found to delete';
            return res.status(404).json(errors);
        }
        res.json(productsub);
    })
    .catch(err=> res.status(404).json({error:"ProductSub Not Found"}));
});

// @route GET  api/productsub/edit
// @desc  Edit productsub by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateProductSubInput(req.body,req.user);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
//GET DATA BY USER TYPE
    //ADMIN TYPE
  
        const editdata = {
            productID :   req.body.productID,
            productSubName :   req.body.productSubName,
            saleDesc :   req.body.saleDesc,
            sku :   req.body.sku,
            type :   req.body.type,
            salePrice :   req.body.salePrice,
            taxable :   req.body.taxable,
            incomeAccount :   req.body.incomeAccount,
            purchaseDesc :   req.body.purchaseDesc,
            purchaseCost :   req.body.purchaseCost,
            expenseAccount :   req.body.expenseAccount,
            quantity :   req.body.quantity,
            recorder :   req.body.recorder,
            inventoryAsset :   req.body.inventoryAsset,
            quantityAsDate :   req.body.quantityAsDate,
            isEnabled:   req.body.isEnabled,  
            adminID:req.user.id, 
        };
      
        ProductSub.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
        .then(productsub => {
            if(!productsub){
                errors.productsub = 'productsub not found';
                return res.status(404).json(errors);
            }
            res.json(productsub);
        })
        .catch(err=> res.status(404).json({error:"ProductSub Not Found"}));
    
   
        
});


module.exports = router;
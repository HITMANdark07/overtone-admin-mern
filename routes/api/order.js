const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const stripe = require('stripe')("sk_test_51ILJeWFFlK0Wy0K7uswKDiaRS0uuAm7mx5QrUpZosno2bhxfvZEkEWqv4HykEotF90qznPq0sAzFk8uW9ZNJHsta000hE9ir3K");

//Load document Schema
const Order = require('../../models/Order');
const OrderStatus = require('../../models/OrderStatus');
const Product = require('../../models/Product');
const OrderMeta = require('../../models/OrderMeta');
const Setting = require('../../models/Setting');
const axios = require('axios');
//QUICKBOOK OAUTH
const OAuthClient = require('intuit-oauth');
var oauthClientOrder = new OAuthClient({
    clientId: 'AB2T4UWnpedrpGq33wumOOGMzsG92cTzfytneE8xmJwwS1CtuP',
    clientSecret: 'jMywcYPlGTGA9Fd1Lt1eWbLQXJ5Tx19JbL4VBRC0',
    environment: 'sandbox',
    redirectUri: 'http://ec2-3-239-208-80.compute-1.amazonaws.com:5000/admin/quickbook/callback',
    //redirectUri: 'http://localhost:3000/admin/quickbook/callback',

});



//Validation
const validateOrdersInput = require('../../validation/Order/OrderValidation');

// @route GET  api/stores/test
// @desc  Test documents route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Order Works!!"}));

router.post('/quickbook/purchase',async (req,res)=> {
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

      const body = req.body;
      oauthClientOrder
      .makeApiCall({
      url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365177497720/purchaseorder?minorversion=40',
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

});

router.post('/stripe-checkout',(req,res)=> {
	stripe.charges.create(req.body,(stripeErr, stripeRes)=>{
		if (stripeErr) {
		    res.status(500).send({ error: stripeErr });
		 } else {
		    res.status(200).send(stripeRes);
		  }
	});
});

router.post('/checkpayment',passport.authenticate('jwt',{session:false}),(req,res)=>{
    axios({
        method: "GET",
        url: "https://apps.bookeey.com/pgapi/api/payment/paymentstatus",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
         data:{
            "Mid": "mer160009",
            "MerchantTxnRefNo":[req.body.merchantID],
            "HashMac": "3f1d6bfe711e678304b02bc3e08e24cad2afece0856c5550b810c37b948954d9e1122758826df2f04073607f2ed579ac6ac3e8e87b9c8d046e300c6311af8145"
            }
      })
        .then(async result => {
            var resultData=result.data;
            if(resultData.PaymentStatus){
                var paymentResult=resultData.PaymentStatus[0];
               
                if(paymentResult.PaymentId && paymentResult.PaymentId !="" ){
                   
                      var chkpay=await  Order.findOne({paymentID:paymentResult.PaymentId})
                      console.log("chk pay",chkpay);
                      if(!chkpay){
                            res.json({
                                paymentID:paymentResult.PaymentId,
                            })
                      }else{
                          res.status(400).json({
                              error:"Payment ID Already Exist"
                          })
                      }
                    
                }
            }
        })
        .catch(err => {
            res.status(400).json({error:"Error Occured while Checking Payment Status,Try Again"});
        })
});

///////////////////////////////////////User Routes///////////////////////////////////////////


router.post('/mobile/checkout',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    const {errors, isValid} = validateOrdersInput(req.body);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    //Order Status

    var orderstatus=await OrderStatus.findOne();
    const orderfields = {
         userID   :   req.user.id,
         name    :   req.body.name,
         mobile      :   req.body.mobile,
         email      :   req.body.email,
         address    :   req.body.address,
         total       :   req.body.total,
         product    :   JSON.stringify(req.body.product),
         status   :   orderstatus._id,
         paymentType   :   req.body.paymentType,

    };
    new Order(orderfields).save().then(order=>res.json(order));
});

router.get('/getorder',passport.authenticate('jwt',{session:false}),(req,res)=>{
    //Order.find({userID: req.user.id})
    Order.aggregate([
        { $match : { userID:mongoose.Types.ObjectId(req.user.id)}},
        {
           $lookup:{
              from:"orderstatuses",
              foreignField:"_id",
              localField:"status",
              as:"status"
           }
        },
        {
           $unwind:"$status"
        },
        {
 
            $lookup:{
                 from:"shippings",
                 foreignField:"_id",
                 localField:"shippingID",
                 as:"shipping"
            }
         },
         {
            $unwind:"$shipping"
         },
         
         { $sort: { date: -1 } },
     ])
    .then(orders=> res.json(orders))
    .catch(err=>res.status(404).json({errors:"No Orders to show"}))
});

router.post('/getordermeta',passport.authenticate('jwt',{session:false}),(req,res)=>{
    //Order.find({userID: req.user.id})
    OrderMeta.aggregate([
        { $match :{$and:[{ userID:mongoose.Types.ObjectId(req.user.id)},{orderID:mongoose.Types.ObjectId(req.body.orderID)}]}},
        {
           $lookup:{
              from:"products",
              foreignField:"_id",
              localField:"productID",
              as:"product"
           }
        },
        {
           $unwind:"$product"
        },
         
         { $sort: { date: -1 } },
     ])
    .then(orders=> res.json(orders))
    .catch(err=>res.status(404).json({errors:"No Orders to show"}))
});

router.post('/getordermetaall',passport.authenticate('jwt',{session:false}),(req,res)=>{
    //Order.find({userID: req.user.id})
    OrderMeta.aggregate([
        { $match :{orderID:mongoose.Types.ObjectId(req.body.orderID)}},
        {
           $lookup:{
              from:"products",
              foreignField:"_id",
              localField:"productID",
              as:"product"
           }
        },
        {
           $unwind:"$product"
        },
         
         { $sort: { date: -1 } },
     ])
    .then(orders=> res.json(orders))
    .catch(err=>res.status(404).json({errors:"No Orders to show"}))
});

// router.get('/getorder',passport.authenticate('jwt',{session:false}),(req,res)=>{
//     Order.aggregate([
//         {$match:{ userID:mongoose.Schema.ObjectId(req.user.id)}},
//         {
 
//             $lookup:{
//                  from:"shippings",
//                  foreignField:"_id",
//                  localField:"shippingID",
//                  as:"shipping"
//             }
//          },
//          {
//             $unwind:"$shipping"
//          },
//          {
//             $lookup:{
//                  from:"orderstatues",
//                  foreignField:"_id",
//                  localField:"status",
//                  as:"status"
//             }
//          },
//          {
//             $unwind:"$status"
//          },
//         { $sort: { date: -1 } },
// ])
//     .then(orders=> res.json(orders))
//     .catch(err=>res.status(404).json({errors:"No Orders to show"}))
// });

// @route GET  api/documents/
// @desc  Get Document
// @access private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Order.aggregate([
        {
           $lookup:{
              from:"orderstatuses",
              foreignField:"_id",
              localField:"status",
              as:"status"
           }
        },
        {
           $unwind:"$status"
        },
        /*{
 
            $lookup:{
                 from:"shippings",
                 foreignField:"_id",
                 localField:"shippingID",
                 as:"shipping"
            }
         },
         {
            $unwind:"$shipping"
         },*/
         
         { $sort: { date: -1 } },
     ])
    .sort({date: -1})
    .then(orders=> res.json(orders))
    .catch(err=>res.status(404).json({errors:"No Orders to show"}))
});

// @route POST  api/documents/
// @desc  Create Stores
// @access private
router.post('/',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    console.log("order api called")
    var OrderNo=1000
    const orderStatus=await OrderStatus.findOne({StatusName:'Pending'})
    const orderNoData=await Order.findOne().sort({date:-1})
    if(orderNoData){
        OrderNo=orderNoData.orderNo+1
    }
    const orderfields = {
        userID:req.user.id,
        orderNo:OrderNo,
        shippingAddress:JSON.stringify(req.body.shippingAddress),
        billingAddress:JSON.stringify(req.body.billingAddress),
        couponAmount:req.body.couponAmount,
        couponCode:req.body.couponCode,
        finalAmount:req.body.finalAmount,
        orderType:req.body.orderType,
        giftAmount:req.body.giftAmount,
        paymentMethod:req.body.paymentMethod,
        shippingAmount:req.body.shippingAmount,
        shippingID:req.body.shippingID,
        totalAmount:req.body.totalAmount,
        status:orderStatus._id,
        paymentID:req.body.paymentID
    };

    //QuickBook Integration 
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

     
     var lineData=[];

    new Order(orderfields).save().then(order=>{
        var orderResponse=order;
        var cartItems=req.body.cart;
        cartItems.map(async (result,index)=>{
            const stockData=await Product.findOne({_id:result.id})
             /*var variationArray=stockData.variationArray ? JSON.parse(stockData.variationArray) :[]
             var stockCheck=variationArray.find(x=>x.size===result.selectedSize && x.color===result.selectedColor);*/

            var cartLength=cartItems.length
            if(stockData){
                //var currentStock=parseInt(stockCheck.stock);

               /* if(currentStock>0){
                    var newStock=currentStock - parseInt(result.quantity)
		    variationArray.find(x=>x.size===result.selectedSize && x.color===result.selectedColor).stock=newStock;
		  var totalQty = variationArray.reduce((acc, curr) => acc + (parseInt(curr.stock)), 0);
                    await Product.findOneAndUpdate({_id:stockData._id},{$set: {stockCount:totalQty,variationArray:JSON.stringify(variationArray)}},{new: true})*/
		var currentStock=parseInt(stockData.stockCount);
if(currentStock>0){
  
		var newStock=currentStock - parseInt(result.quantity)
		await Product.findOneAndUpdate({_id:stockData._id},{$set: {stockCount:newStock}},{new: true})
                    const orderMeta={
                        userID:req.user.id,
                        orderID:order._id,
                        productID:result.id,
                        quantity:result.quantity,
                        price:result.price,
                        selectedAttribute:JSON.stringify(result.selectedAttribute),
                        sku:result.selectedAttribute.reduce((acc, curr) => `${acc}${curr.value}-`, "")
                    }
                   var orderMetaResult= await new OrderMeta(orderMeta).save()
                //    lineData.push({
                //     "Id": `${index+1}`,
                //     "LineNum": index+1,
                //     "Description": result.description,
                //     "Amount": parseFloat(result.price) * parseFloat(result.quantity),
                //     "DetailType": "SalesItemLineDetail",
                //     "SalesItemLineDetail": {
                //         "ItemRef": {
                //             "value": result.price,
                //             "name": result.name
                //         },
                //         "UnitPrice": result.price,
                //         "Qty": result.quantity,
                //         "TaxCodeRef": {
                //             "value": "NON"
                //         }
                //     }
                // })
                lineData.push({
                    "Description": result.description,
                    "DetailType": "SalesItemLineDetail",
                    "SalesItemLineDetail": {
                      "TaxCodeRef": {
                        "value": "NON"
                      },
                      "Qty": parseInt(result.quantity),
                      "UnitPrice": result.price,
                      "ItemRef": {
                        "name": "Pest Control",
                        "value": "10"
                      }
                    },
                    "LineNum": index+1,
                    "Amount": parseFloat(result.price) * parseFloat(result.quantity),
                    "Id": `${index+1}`
                  })
                    if(cartLength=== index+1){
                        var totalCost = lineData.reduce((acc, curr) => acc + (curr.Amount), 0)
                       

                    //     const PurchaseOrderBody = {
                            
                    //             "SalesReceipt": {
                    //               "DocNumber": "1003", 
                    //               "SyncToken": "0", 
                    //               "domain": "QBO", 
                    //               "Balance": 0, 
                    //               "PaymentMethodRef": {
                    //                 "name": "Check", 
                    //                 "value": "2"
                    //               }, 
                    //               "BillAddr": {
                    //                 "Lat": "INVALID", 
                    //                 "Long": "INVALID", 
                    //                 "Id": "49", 
                    //                 "Line1": "Dylan Sollfrank"
                    //               }, 
                    //               "DepositToAccountRef": {
                    //                 "name": "Checking", 
                    //                 "value": "35"
                    //               }, 
                    //               "TxnDate": "2014-09-14", 
                    //               "TotalAmt": 337.5, 
                    //               "CustomerRef": {
                    //                 "name": "Dylan Sollfrank", 
                    //                 "value": "6"
                    //               }, 
                    //               "CustomerMemo": {
                    //                 "value": "Thank you for your business and have a great day!"
                    //               }, 
                    //               "PrintStatus": "NotSet", 
                    //               "PaymentRefNum": "10264", 
                    //               "EmailStatus": "NotSet", 
                    //               "sparse": false, 
                    //               "Line": lineData, 
                    //               "ApplyTaxAfterDiscount": false, 
                    //               "CustomField": [
                    //                 {
                    //                   "DefinitionId": "1", 
                    //                   "Type": "StringType", 
                    //                   "Name": "Crew #"
                    //                 }
                    //               ], 
                    //               "Id": "11", 
                    //               "TxnTaxDetail": {
                    //                 "TotalTax": 0
                    //               }, 
                    //               "MetaData": {
                    //                 "CreateTime": "2014-09-16T14:59:48-07:00", 
                    //                 "LastUpdatedTime": "2014-09-16T14:59:48-07:00"
                    //               }
                    //             }, 
                    //             "time": "2015-07-29T09:29:56.229-07:00"
                               
                              
                           
                    //    };
                    console.log("quicbook before")
                    var PurchaseOrderBody={ 
                        "Line":lineData,
                        "CustomerRef": {
                            "name": req.user.name,
                            "value": req.user.quickbookID
                          },
                          "CustomerMemo": {
                            "value": "Thank you for your business and have a great day!"
                          },
                    }
                       oauthClientOrder
                       .makeApiCall({
                       url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365177497720/salesreceipt?minorversion=40',
                       method: 'POST',
                       headers: {
                           'Content-Type': 'application/json',
                       },
                       body: JSON.stringify(PurchaseOrderBody),
                       })
                       .then(function (response) {
                           //res.json(response)
                           console.log("response",response)
                       
                       })
                       .catch(function (e) {
                        console.log("e",e)
                           res.status(400).json(e)
                       });
                    console.log("quicbook after")

                      return res.json(orderResponse)
                    }

                    
                }else{
                        await OrderMeta.deleteMany({orderID:order._id})
                        await Order.deleteMany({_id:order._id})
                        return res.status(400).json({error:"Product Out of Stock"})

                }
            }
          

        })
    }).catch(err=>{
        res.status(400).json(e)
        console.log("err",err)
    })
});

///////////////////////////////////vendor Routes///////////////////////////////////////////////////

//all orders
router.get('/all',(req,res)=>{
   
    
    Order.find()
    .sort({date: -1})
    .then(storesall=> res.json(storesall))
    .catch(err=>res.status(404).json({errors:"No stores to show"}))

});
router.post('/orderupdate',(req,res)=>{

    Order.findOneAndUpdate({_id:req.body.orderID}, { $set: {status:req.body.status}})
    .then(orderdata => {
        res.json(orderdata)
    } )
    .catch(err => console.log(err));

});

module.exports = router;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const ProductSubSchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    }, 
    productID:{
        type: Schema.Types.ObjectId,
        ref : 'products'
    },  
    productSubName:{
        type:String,
        //required:true
    },
    saleDesc:{
        type:String,
        //required:true
    },
    sku:{
        type:String,
        //required:true
    },
    type:{
        type:String,
        //required:true
    },
    salePrice:{
        type:String,
        //required:true
    },
    taxable:{
        type:String,
        //required:true
    },
    incomeAccount:{
        type:String,
        //required:true
    },
    purchaseDesc:{
        type:String,
        //required:true
    },
    purchaseCost:{
        type:String,
        //required:true
    },
    expenseAccount:{
        type:String,
        //required:true
    },
    quantity:{
        type:String,
    },
    recorder:{
        type:String,
    },
    inventoryAsset:{
        type:String,
    },
    quantityAsDate:{
        type:String,
    },
    isEnabled:{
        type:String,
        enum : ['Yes', 'No'], 
        //required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = ProductSub = mongoose.model('productsubs',ProductSubSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const OrderSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        ref : 'users'
    },
    orderNo:{
        type:Number,
        required:true
    },
    billingAddress:{
        type:String,
        required:true
    },
    shippingAddress:{
        type:String,
        required:true
    },
    couponAmount:{
        type: Number,
       // required:true
    }, 
    couponCode:{
        type:String,
        //required:true
    },
    finalAmount:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    orderType:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    shippingAmount:{
        type: Number,
        required:true
    }, 
    giftAmount:{
        type: Number,
        required:true
    },
    shippingID:{
        type: Schema.Types.ObjectId,
        ref : 'shippings'
    },
    status:{
        type: Schema.Types.ObjectId,
        ref : 'orderstatus'
    },  
    paymentID:{
        type:String,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Order = mongoose.model('orders',OrderSchema);

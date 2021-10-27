const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const CouponSchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    }, 
    couponCode:{
        type:String,
        required:true
    }, 
    type:{
        type:String,
        required:true
    }, 
    value:{
        type:String,
        required:true
    }, 
    validFrom:{
        type:String,
        required:true
    },
    validTo:{
        type:String,
        required:true
    },
    isEnabled:{
        type:String,
        enum : ['Yes', 'No'], 
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Coupon = mongoose.model('coupons',CouponSchema);

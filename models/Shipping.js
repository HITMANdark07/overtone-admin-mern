const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const ShippingSchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    }, 
    shippingName:{
        type:String,
        required:true
    },
    shippingDesc:{
        type:String,
        required:true
    }, 
    amount:{
        type:String,
        required:true
    }, 
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Shipping = mongoose.model('shippings',ShippingSchema);

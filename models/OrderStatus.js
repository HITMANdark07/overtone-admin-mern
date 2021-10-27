const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const OrderStatusSchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    }, 
    StatusName:{
        type:String,
        required:true
    }, 
    // StatusNameAr:{
    //     type:String,
    //     required:true
    // }, 
    visibility:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Slider = mongoose.model('orderstatus',OrderStatusSchema);

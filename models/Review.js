const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const ReviewSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        ref : 'users'
    }, 
    productID:{
        type: Schema.Types.ObjectId,
        ref : 'product'
    },
    review:{
        type:String,
        required:true
    }, 
    status:{
        type:String,
        required:true
    }, 
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Review = mongoose.model('reviews',ReviewSchema);

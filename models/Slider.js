const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const SliderSchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    }, 
    categoryID:{
        type: Schema.Types.ObjectId,
        ref : 'categorires'
    }, 
    productID:{
        type: Schema.Types.ObjectId,
        ref : 'products'
    }, 
    photoUrl:{
        type:String,
        required:true
    }, 
    sliderName:{
        type:String,
        required:true
    },
    sliderTitle:{
        type:String,
    },
    sliderDesc:{
        type:String,
    },
    visiblity:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Slider = mongoose.model('sliders',SliderSchema);

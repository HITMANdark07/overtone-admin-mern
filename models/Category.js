const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const CategorySchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    },  
    categoryName:{
        type:String,
        required:true
    },
    dropdown:{
        type:String,
        enum : ['Yes', 'No'], 
        required:true
    },
    sliderStyle:{
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

module.exports = Category = mongoose.model('categories',CategorySchema);

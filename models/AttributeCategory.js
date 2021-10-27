const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const AttributeCategorySchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    },  
    attributeName:{
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

module.exports = AttributeCategory = mongoose.model('attributecategories',AttributeCategorySchema);

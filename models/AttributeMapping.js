const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const AttributeMappingSchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    },  
    parentAttributeCategoryID:{
        type: Schema.Types.ObjectId,
        ref : 'parentattributecategories'
    }, 
    attributeCategoryID:{
        type: Schema.Types.ObjectId,
        ref : 'attributecategories'
    }, 
    productID:{
        type: Schema.Types.ObjectId,
        ref : 'products'
    },
    mappingName:{
        type:Number,
        required:true
    },
    mappingType:{
        type:String,
        required:true
    },
    mappingLabel:{
        type:String,
        required:true
    },
    mappingValue:{
        type:String,
        required:true
    },
    photoUrl:{
        type:String,
       // required:true
    },
    additionalPrice:{
        type:String,
        required:true
    },
    dependentField:{
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

module.exports = AttributeMapping = mongoose.model('attributemappings',AttributeMappingSchema);

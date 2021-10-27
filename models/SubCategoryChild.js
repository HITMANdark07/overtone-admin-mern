const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const SubCategoryChildSchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    },  
    categoryID:{
        type: Schema.Types.ObjectId,
        ref : 'categories'
    }, 
    subcategoryID:{
        type: Schema.Types.ObjectId,
        ref : 'subcategories'
    },  
    photoUrl:{
        type:String,
        required:true
    }, 
    subCategoryChildName:{
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

module.exports = SubCategoryChild = mongoose.model('subcategorychilds',SubCategoryChildSchema);

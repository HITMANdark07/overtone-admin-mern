const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const ProductSchema = new Schema({
    name:{
        type:String,
        // required:true
    },
    description:{
        type:String,
        // required:true
    },
    price:{
        type:String,
        // required:true
    },
    discountPrice:{
        type:Number,
        // required:true
    },
    stockCount:{
        type:String,
        // required:true
    },
    photoUrl1:{
        type:String,
        // required:true
    },
    photoUrl2:{
        type:String,
       
    }, 
    documents:{
        type:String,
        // required:true
    }, 
    maintenanceText:{
        type:String,
        // required:true
    },
    maintenanceBtnText:{
        type:String,
        // required:true
    },
    maintenanceFileUrl:{
        type:String,
        //required:true
    },
    acousticsText:{
        type:String,
        // required:true
    },
    categoryID:{
        type: Schema.Types.ObjectId,
        ref : 'categories'
    },
    subcategoryID:{
        type: Schema.Types.ObjectId,
        ref : 'subcategories'
    },
    subcategoryChildID:{
        type: Schema.Types.ObjectId,
        ref : 'subcategorychilds'
    },
    quickship:{
        type:String,
        enum : ['Yes', 'No'], 
        // required:true
    },
    isEnabled:{
        type:String,
        enum : ['Yes', 'No'], 
        // required:true
    },
    keyword:{
        type:String,
    },
    status: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
});
ProductSchema.index({ name: 'text', keyword: 'text' });
//ProductSchema.index({name:1,keyword:2})


module.exports = Product = mongoose.model('products',ProductSchema);

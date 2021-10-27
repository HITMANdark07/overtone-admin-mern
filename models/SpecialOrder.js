const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const SpecialOrderSchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    }, 
    photoUrl:{
        type:String,
    }, 
    name:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true
    }, 
    mobile:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
   special:{
        type:String,
    },
   specialDesc:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = SpecialOrder = mongoose.model('specialorders',SpecialOrderSchema);

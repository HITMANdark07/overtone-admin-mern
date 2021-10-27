const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const AdminSchema = new Schema({
    name:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    roleID:{
        type: Schema.Types.ObjectId,
        ref : 'roles'
    }, 
    deviceID:{
        type:String,
    },  
    socketID:{
        type:String,
    }, 
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Admin = mongoose.model('admin',AdminSchema);

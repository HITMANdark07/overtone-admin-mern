const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const RoleSchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    },  
    roleName:{
        type:String,
        required:true
    }, 
    permissionList:{
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

module.exports = Role = mongoose.model('roles',RoleSchema);

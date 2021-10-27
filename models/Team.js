const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const TeamSchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    }, 
    photoUrl:{
        type:String,
        required:true
    }, 
    name:{
        type:String,
        required:true
    }, 
    nameAr:{
        type:String,
        required:true
    }, 
    position:{
        type:String,
        required:true
    }, 
    positionAr:{
        type:String,
        required:true
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

module.exports = Team = mongoose.model('teams',TeamSchema);

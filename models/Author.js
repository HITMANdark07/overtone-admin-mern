const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const AuthorSchema = new Schema({
    name:{
        type:String,
    },
    nameAr:{
        type:String,
    }, 
    email:{
        type:String,
    }, 
    mobile:{
        type:String,
        required:true
    },
    photo:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    descriptionAr:{
        type:String,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Author = mongoose.model('authors',AuthorSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const BlogSchema = new Schema({
    adminID:{
        type: Schema.Types.ObjectId,
        ref : 'admins'
    }, 
    photoUrl:{
        type:String,
        required:true
    }, 
    title:{
        type:String,
        required:true
    },
    shortContent:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }, 
    blogType:{
        type:String,
        required:true
    }, 
    sliderImage:{
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

module.exports = Blog = mongoose.model('blogs',BlogSchema);

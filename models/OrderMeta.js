const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const OrderMetaSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        ref : 'users'
    },
    orderID:{
        type: Schema.Types.ObjectId,
        ref : 'orders'
    },
    productID:{
        type: Schema.Types.ObjectId,
        ref : 'products'
    },
    quantity:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    selectedAttribute:{
        type:String,
    },
    sku:{
        type:String,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = OrderMeta = mongoose.model('ordermetas',OrderMetaSchema);
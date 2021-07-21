// making model of the product 
const mongoose = require('mongoose');
const Review = require('./review')

//making basic schema and then making model
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,   // schema jo banaya hai uski harr id ko array mei dala hai 
            ref:'Review' //review model i.e id yahan se aaegi 
        }
    ]
});

const Product = mongoose.model('Product',productSchema);
module.exports = Product;
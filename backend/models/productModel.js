const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please Enter product name"],
        trim:true      
        //If you add { type: String, trim: true } to a field in your schema, then trying to save strings 
        //like " hello" , or "hello " , or " hello " , would end up being saved as "hello" in Mongo - i.e. white spaces 
        //will be removed from both sides of the string
    }, 
    description: {
        type:String,
        required:[true,"Please Enter product Description"]
    },
    price: {
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    ratings: {
        type:Number,
        default:0
    },
    images: [
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type: String,
        required: [true,"Please Enter Product Category"]
    },
    Stock:{
        type: Number,
        required: [true,"Please Enter Product Stock"],
        maxLength:[4,"Stock Cannot Exceed 4 character"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews:[
        { 
            user:{              // This contains id of User who created the Comment
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
        
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user:{         // This contains id of User who created the Product
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

 // Validating Schema
 
module.exports = mongoose.model("Product",productSchema);
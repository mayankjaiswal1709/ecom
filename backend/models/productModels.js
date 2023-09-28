const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({


   name: {
        type: String,
        required: [true,"Please Enter Product Name"],
        trim:true
    },
    description: {
        type: String,
        required: [true,"Please Enter Product Description"],
    },
    price: {
        type: Number,
        required: [true,"Please Enter Product Price"],
        maxLength:[8,"Price cannnot excced 8 character"],
    },
    rating: {
        type: Number,
        default:0
    },
    image: [
        {
        public_id:{
          type :String,
          required:true
       },
        url:{
          type :String,
          required:true
       }   
      }
    ],
    categories: {
        type: String,
        required: [true,"Please Enter Product Categories"],
       
    },
    Stock: {
        type: Number,
        required: [true,"Please Enter Product Stock"],
        maxLength:[4,"Stock can not exceed 4 character "],
        default:1
    },
    numOfReviews: {
        type: Number,
        default:0,
    },
    Reviews:[
        {
            name:{
                type :String,
                required:true
            },
            rating:{
                type :Number,
                required:true
            },
            comment:{
                type :String,
                required:true
            },
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },


    isActive: {
        type: Boolean,
        default: true
    }

})
productSchema.set('timestamps', true)
module.exports = mongoose.model('Product', productSchema)
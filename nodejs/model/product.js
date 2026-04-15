const mongoose=require('mongoose');
const {Schema}=mongoose;
const productSchema=new Schema({
  title:String,
  brand:String,
  year:Number,
  author:String,
  thumbnail:String,
  price:Number,
})
exports.product=mongoose.model('product',productSchema);
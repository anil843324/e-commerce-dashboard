const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  cargeory: String,
  userId:String,
  company:String

});


module.exports= mongoose.model("products",productSchema)
const mongoose = require("mongoose");

//Schema means database
const SellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const ProductModel = mongoose.model("products", SellerSchema);

module.exports = ProductModel;
const mongoose = require("mongoose");

//Schema means database
const SellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const SellerModel = mongoose.model("sellers", SellerSchema);

module.exports = SellerModel;
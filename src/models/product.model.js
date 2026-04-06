import mongoose, { Schema } from "mongoose";


const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: {
    type: Array,   
  },
  video: {
    type: Array
  },
  height: Number,
  width: Number,
  num_of_pockets: Number
});

const Product = mongoose.model("Product", productSchema);

export default Product;

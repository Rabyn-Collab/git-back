import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  product_detail: {
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  numReviews: {
    type: Number,
    required: true
  },
  product_image: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  countInStock: {
    type: Number,
    required: true
  }



}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

export default Product;






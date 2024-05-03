import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    unique: true,
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
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  product_image: {
    type: String,
    unique: true,
    required: true
  },

  brand: {
    type: String,
    enum: ['Nike', 'Panasonic', 'Samsung', 'Dolce', 'Kfc'],
    required: true
  },

  category: {
    type: String,
    required: true
  },

  countInStock: {
    type: Number,
    required: true
  },
  reviews: [
    {
      username: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
  ]



}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

export default Product;






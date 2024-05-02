import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true });


const Order = mongoose.model('Order', orderSchema);

export default Order;






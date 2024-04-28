import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    min: [5, 'min character 5'],
    required: [true, 'password is required'],
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  shippingAddress: {
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    isEmpty: { type: Boolean, default: true }
  }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export default User;






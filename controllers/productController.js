import Product from "../models/Product.js";



export const getAllProducts = async (req, res) => {
  try {
    const data = await Product.find({});
    return res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}


export const addProduct = async (req, res) => {
  try {
    // const data = await Product.find({});
    return res.status(200).json({
      status: 'success',
      message: 'product added successfully'
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}
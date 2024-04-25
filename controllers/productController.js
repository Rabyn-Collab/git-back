import Product from "../models/Product.js";
import mongoose from "mongoose";


export const getTopProducts = (req, res, next) => {
  req.query = { rating: { $gt: 4 } };
  req.query.limit = 5;
  next();
}


export const getAllProducts = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ['sort', 'page', 'fields', 'search', 'limit'];
  excludeFields.forEach((val) => delete queryObj[val]);

  try {

    if (req.query.search) {
      queryObj.product_name = { $regex: req.query.search, $options: 'i' }
    }

    let query = Product.find(queryObj);

    if (req.query.fields) {
      const selectFields = req.query.fields.split(',').join('');
      query = query.select(selectFields);
    }

    if (req.query.sort) {
      const sorts = req.query.sort.split(',').join('');
      query = query.sort(sorts);
    }



    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const data = await query;

    const count = await Product.countDocuments(query);
    return res.status(200).json({
      status: 'success',
      products: data,
      count
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}


export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {

    if (mongoose.isValidObjectId(id)) {
      const data = await Product.findById(id);
      if (!data) return res.status(404).json({ message: 'data not found' });
      return res.status(200).json({
        status: 'success',
        data: data
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'please provide valid id'
      });
    }





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
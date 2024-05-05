import Product from "../models/Product.js";
import mongoose from "mongoose";
import fs from 'fs';

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
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock
  } = req.body;

  try {
    const data = await Product.create({
      product_name,
      product_detail,
      brand,
      category,
      countInStock,
      product_price,
      product_image: req.imagePath
    });
    return res.status(200).json({
      status: 'success',
      message: 'product added successfully'
    });
  } catch (err) {

    if (err.code !== 11000) {
      fs.unlink(`.${req.imagePath}`, (err) => console.log(err));
    }

    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}





export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock
  } = req.body;

  try {

    if (req.imagePath) {
      const data = await Product.findByIdAndUpdate(id, {
        product_name,
        product_detail,
        brand,
        category,
        countInStock,
        product_price,
        product_image: req.imagePath
      });
      return res.status(200).json({
        status: 'success',
        message: 'product added successfully'
      });
    } else {
      const data = await Product.findByIdAndUpdate(id, {
        product_name,
        product_detail,
        brand,
        category,
        countInStock,
        product_price,
      });
      return res.status(200).json({
        status: 'success',
        message: 'product added successfully'
      });
    }


  } catch (err) {

    if (err.code !== 11000) {
      fs.unlink(`.${req.imagePath}`, (err) => console.log(err));
    }

    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}



export const removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const exist = await Product.findById(id);
    if (!exist) return res.status(404).json({ message: 'product not found' });
    fs.unlink(`.${exist.product_image}`, (err) => console.log(err));
    await exist.deleteOne();

    return res.status(200).json({
      status: 'success',
      message: 'product removed successfully'
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}





export const addReview = async (req, res) => {
  const { id } = req.params;
  const { comment, rating, username } = req.body;

  try {

    const isExist = await Product.findById(id);
    if (isExist) {
      const isReviewExist = isExist.reviews.find((review) => review.user.toString() === req.userId);
      if (isReviewExist) return res.status(400).json({ message: 'you already reviewd it' });
      isExist.reviews.push({ comment, rating, username, user: req.userId });
      isExist.rating = isExist.reviews.reduce((a, b) => a + b.rating, 0) / isExist.reviews.length;
      isExist.numReviews = isExist.reviews.length;
      await isExist.save();
      return res.status(200).json({
        status: 'success',
        message: `review added successfully`
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: `product not found`
      });
    }

  } catch (err) {


    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}



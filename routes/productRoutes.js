
import express from 'express';
import { addProduct, getAllProducts } from '../controllers/productController.js';
import { adminCheck } from '../middleware/checkUser.js';


const router = express.Router();


router.route('/').get(getAllProducts).post(adminCheck, addProduct);



export default router;

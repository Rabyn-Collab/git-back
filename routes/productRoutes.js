
import express from 'express';
import { addProduct, getAllProducts, getTopProducts } from '../controllers/productController.js';
import { adminCheck } from '../middleware/checkUser.js';


const router = express.Router();


router.route('/').get(getAllProducts).post(adminCheck, addProduct);
router.route('/topProducts').get(getTopProducts, getAllProducts);



export default router;

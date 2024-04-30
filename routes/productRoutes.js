
import express from 'express';
import { addProduct, getAllProducts, getProductById, getTopProducts, updateProduct } from '../controllers/productController.js';
import { checkAdmin, checkUser } from '../middleware/checkUser.js';
import { checkFile, updatFileCheck } from '../middleware/fileCheck.js';


const router = express.Router();


router.route('/').get(getAllProducts).post(checkUser, checkAdmin, checkFile, addProduct);

router.route('/topProducts').get(getTopProducts, getAllProducts);
router.route('/:id').get(getProductById).patch(checkUser, checkAdmin, updatFileCheck, updateProduct);




export default router;

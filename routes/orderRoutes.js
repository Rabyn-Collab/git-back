
import express from 'express';
import { addOrder, getAllOrders, getOrderById } from '../controllers/orderController.js';
import { checkAdmin, checkUser } from '../middleware/checkUser.js';




const router = express.Router();


router.route('/').get(checkUser, checkAdmin, getAllOrders).post(checkUser, addOrder);

router.route('/:id').get(checkUser, getOrderById);




export default router;

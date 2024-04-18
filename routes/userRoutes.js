import express from 'express';
import { userLogin } from '../controllers/userController.js';

const handleAll = (req, res) => {
  return res.status(405).json({
    status: 'error',
    message: 'method not allowed'
  });
}

const router = express.Router();

router.route('/login').post(userLogin).all(handleAll);



export default router;

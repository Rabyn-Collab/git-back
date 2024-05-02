import express from 'express';
import { userLogin, userRegister, userUpdate } from '../controllers/userController.js';
import Joi from 'joi';
import validator from 'express-joi-validation';
import { checkUser } from '../middleware/checkUser.js';

const validate = validator.createValidator({});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fullname: Joi.string().min(5).max(20).required()
});

const handleAll = (req, res) => {
  return res.status(405).json({
    status: 'error',
    message: 'method not allowed'
  });
}

const router = express.Router();

router.route('/login').post(validate.body(loginSchema), userLogin).all(handleAll);
router.route('/register').post(validate.body(registerSchema), userRegister).all(handleAll);

router.route('/update').patch(checkUser, userUpdate);



export default router;

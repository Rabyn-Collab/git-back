import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const userLogin = (req, res) => {

  return res.status(200).json({
    status: 'success',
    data: 'successfully logged in',
    obj: req.body
  });
}



export const userRegister = async (req, res) => {
  const { email, password, fullname } = req.body;
  try {
    const isExist = await User.findOne({ email: email });

    if (isExist) return res.status(400).json({
      status: 'error',
      data: 'user already exist',
    });

    const hash = bcrypt.hashSync(password, 10);
    await User.create({
      email,
      password: hash,
      fullname
    });
    return res.status(200).json({
      status: 'success',
      data: 'successfully user registered',
    });

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }

}


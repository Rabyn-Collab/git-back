import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExist = await User.findOne({ email: email });

    if (isExist) {
      const pass = bcrypt.compareSync(password, isExist.password);
      if (!pass) return res.status(401).json({
        status: 'error',
        data: 'invalid credential',
      });
      const token = jwt.sign({
        userId: isExist._id,
        isAdmin: isExist.isAdmin
      }, 'tokenKey');
      return res.status(200).json({
        status: 'successfully login',
        data: {
          email,
          token,
          isAdmin: isExist.isAdmin,
          fullname: isExist.fullname,
          id: isExist._id
        },
      });
    }

    return res.status(401).json({
      status: 'error',
      message: 'user doesn\'t exist',
    });

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
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


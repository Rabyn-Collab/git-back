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

      // res.cookie('jwt', token, {
      //   expires: false,
      //   secure: false,
      //   httpOnly: true
      // });

      return res.status(200).json({
        status: 'successfully login',
        data: {
          email,
          token,
          isAdmin: isExist.isAdmin,
          fullname: isExist.fullname,
          id: isExist._id,
          shippingAddress: isExist.shippingAddress
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





export const userUpdate = async (req, res) => {
  const { email, fullname, shippingAddress } = req.body;

  try {
    const isExist = await User.findById(req.userId);

    if (isExist) {
      isExist.fullname = fullname || isExist.fullname;
      isExist.email = email || isExist.email;
      isExist.shippingAddress = shippingAddress || isExist.shippingAddress;
      await isExist.save();
      return res.status(200).json({
        status: 'success',
        message: 'successfully user updated',
      });

    } else {
      return res.status(404).json({
        status: 'error',
        data: 'user doesn\'t exist',
      });

    }

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }

}


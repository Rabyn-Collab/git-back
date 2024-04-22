import jwt from 'jsonwebtoken';



export const adminCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {

  } else {
    return res.status(401).json({
      status: 'error',
      message: 'you are not authorised'
    });
  }

}
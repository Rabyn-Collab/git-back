import jwt from "jsonwebtoken";


export const checkUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decode = jwt.decode(token, 'tokenKey');
    if (decode) {
      req.userId = decode.userId;
      req.isAdmin = decode.isAdmin;
      next();
    } else {
      return res.status(401).json({ status: 'error', message: 'you are not authorised' })
    }
  } catch (err) {
    return res.status(400).json({ status: 'error', message: `${err}` })
  }



}


export const checkAdmin = (req, res, next) => {

  if (req.isAdmin) {
    next();
  } else {
    return res.status(401).json({ status: 'error', message: 'you are not authorised' })
  }

}
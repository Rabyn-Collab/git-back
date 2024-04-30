import fs from 'fs';
const validExts = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/webp'];

export const checkFile = (req, res, next) => {

  try {
    if (req.files?.product_image) {
      const file = req.files?.product_image;

      if (validExts.includes(file.mimetype)) {
        file.mv(`./uploads/${file.name}`, (err) => {

        })
        req.imagePath = `/uploads/${file.name}`;
        next();
      } else {
        return res.status(400).json({
          status: 'error', message: `please provide valid image`
        })
      }

    } else {
      return res.status(400).json({
        status: 'error', message: `please provide valid image`
      })

    }



  } catch (err) {
    return res.status(400).json({
      status: 'error', message: `${err}`
    })
  }



}




export const updatFileCheck = (req, res, next) => {
  const file = req.files?.product_image;
  if (file) {
    if (validExts.includes(file.mimetype)) {
      if (!req.body.prevImage) return res.status(400).json({
        status: 'error', message: `please provide old imagePath`
      });

      fs.unlink(`.${req.body.prevImage}`, (err) => { });
      file.mv(`./uploads/${file.name}`, (err) => {

      })
      req.imagePath = `/uploads/${file.name}`;
      next();

    } else {
      return res.status(400).json({
        status: 'error', message: `please provide valid image`
      })
    }
  } else {
    next();
  }



}
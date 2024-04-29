
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



export const userLogin = (req, res) => {
  console.log(req.body);
  return res.status(200).json({
    status: 'success',
    data: 'successfully logged in',
    obj: req.body
  });
}

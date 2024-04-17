import express from 'express';
import productRoutes from './routes/productRoutes.js';
const port = 5000;
const app = express();




app.get('/', (req, res) => {
  return res.status(200).json({
    msg: 'welcome to my server'
  });
});




app.use(productRoutes);


// const handleReqRes = (req, res, next) => {
//   console.log('hello jee middleware');
//   next();
// }




app.listen(port, () => {
  console.log('server live');
});
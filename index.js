import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
const port = 5000;
const app = express();




mongoose.connect('mongodb+srv://teams700:moles900@cluster0.no9horl.mongodb.net/Shops').then((val) => {
  app.listen(port, () => {
    console.log('server live');
  });
}).catch((err) => {
  console.log(err);
})


app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    msg: 'welcome to my server'
  });
});


app.use('/products', productRoutes);
app.use('/users', userRoutes);


app.use((req, res) => {
  return res.status(404).json({
    status: 'error',
    message: 'not found'
  });
});


// const handleReqRes = (req, res, next) => {
//   console.log('hello jee middleware');
//   next();
// }





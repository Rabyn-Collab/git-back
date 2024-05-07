import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
const port = 5000;
const app = express();


// const p = {
//   name: 'rab',
//   age: 90
// };
// delete p['age'];

// console.log(p);


mongoose.connect('mongodb+srv://teams700:moles900@cluster0.no9horl.mongodb.net/Shops').then((val) => {
  app.listen(port, () => {
    console.log('server live');
  });
}).catch((err) => {
  console.log(err);
})
//somes
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
  abortOnLimit: true
}));

app.get('/', (req, res) => {

  return res.status(200).json({
    msg: 'welcome to my server'
  });
});


app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);


app.use((req, res) => {


  return res.status(404).json({
    status: 'error',
    message: 'not found'
  });
});






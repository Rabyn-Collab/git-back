import axios from "axios";




export const getAllProducts = async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return res.status(200).json(response.data);
  } catch (err) {

  }
}
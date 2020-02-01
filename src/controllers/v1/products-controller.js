const Products = require('../../mongo/models/products');

const createProduct = async (request,response) => {
  try {
    console.log('req.body',request.body);
    const { title, desc, price, images, userId } = request.body;

    const product = new Products();
    product.title = title;
    product.desc = desc;
    product.price = price;
    product.images = images;
    product.user = userId;

    await product.save();
    response.status(200).send({ status: 'ok', data: product });
  } catch (error) {
    console.log('createProduct error', error);

    response.status(500).send({status:'error',message:error.message});
  }
};

const deleteProduct = (req,res) => {};

const updateProduct = (req,res) => {};

const getProduct = async(req,res) => {
  try {
    const products = await Products.find({
      price:{$gt:10}
    }).populate('user','username email data role').select('title desc price');
    res.status(200).send({ status: 'ok', data: products });
  } catch (error) {
    console.log('getProduct error', error);

    res.status(500).send({status:'error',message: error.message});
  }
  

};

const getProductByUser = async(req,res) => {
  try {
    const products = await Products.find({
      user: req.params.userId
    });
    res.status(200).send({ status: 'ok', data: products });
  } catch (error) {
    console.log('getProduct error', error);

    res.status(500).send({status:'error',message: error.message});
  }
  

};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProductByUser
};

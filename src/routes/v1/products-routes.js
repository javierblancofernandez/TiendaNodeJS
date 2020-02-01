const express = require('express');
const productsController = require('../../controllers/v1/products-controller');

const router = express.Router();

router.post('/create', productsController.createProduct);
router.post('/delete', productsController.deleteProduct);
router.post('/update', productsController.updateProduct);
router.get('/getAll', productsController.getProduct);
router.get('/getByUser/:userId', productsController.getProductByUser);


module.exports = router;

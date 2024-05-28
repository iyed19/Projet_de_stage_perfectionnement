const express = require('express');
const {getAddProduct,addProduct,getUpdateProduct,updateProduct,getDeleteProduct,deleteProduct,getProducts} = require('../controllers/productController');

const router = express.Router();

router.route('/addProduct').get(getAddProduct).post(addProduct);
router.route('/updateProduct').get(getUpdateProduct).put(updateProduct);
router.route('/deleteProduct').get(getDeleteProduct).delete(deleteProduct);
router.route('/listOfProduct').get(getProducts);

module.exports = router;
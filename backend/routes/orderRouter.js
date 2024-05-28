const express = require('express');
const {getOrder,order,getListOfOrder} = require('../controllers/orderController');

const router = express.Router();

router.route('/order').get(getOrder).post(order);
router.route('/listOfOrder').get(getListOfOrder);

module.exports = router;
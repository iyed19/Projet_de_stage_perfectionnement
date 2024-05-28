const orderCollection = require('../models/order');
const productCollection = require('../models/product');
const agentCollection = require("../models/agent");

exports.getOrder = async (req, res) => {
    try{
        const condition = { quantity: { $gte: 1 } };
        const prdData = await productCollection.find(condition, {"__v": false});
        const agentData = await agentCollection.find({}, {"__v": false});
        if (!prdData || !agentData) {
            res.status(404).send('No products found');
        }else{
            res.render('order', {data: {prdData: prdData, agentData: agentData}});
        }
    }catch(err){
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};
exports.order = async (req, res) => {
    const orderData = {
        category: req.body.category,
        brand: req.body.brand,
        model: req.body.model,
        agent: req.body.agent,
        quantity: req.body.quantity,
        orderDate: Date.now()
    }

    const existingProduct = await productCollection.findOne({category: orderData.category, brand: orderData.brand, model: orderData.model});
    const existingQuantity = parseInt(existingProduct.quantity, 10);
    const ordredQuantity = parseInt(orderData.quantity, 10);
    if(existingQuantity >= ordredQuantity){
        const updatedProduct = await productCollection.updateOne(
            {category: orderData.category, brand: orderData.brand, model: orderData.model},
            {$set: { quantity: existingQuantity - ordredQuantity}});
        const order = await orderCollection.insertMany(orderData);
    }else{
        res.send(`Order failed, Quantity is not enough, You still have just ${existingQuantity} left`);
    }
};



exports.getListOfOrder = async (req, res) => {
    try{
        const listOrders = await orderCollection.find({}, {"__v": false});
        res.render('listOfOrder', {listOrders});
    }catch(err){
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};
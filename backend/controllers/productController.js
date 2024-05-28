const productCollection = require('../models/product');



exports.getAddProduct = (req,res) => {
    res.render("addProduct");
};
exports.addProduct = async (req, res) =>{
    const productData = {
        brand: req.body.brand,
        model: req.body.model,
        category: req.body.category,
        quantity: req.body.quantity,
        buyingDate: req.body.buyingDate
    }

    const existingProduct = await productCollection.findOne({brand: productData.brand, model: productData.model, category: productData.category});

    if(existingProduct){
        const existingQuantity = parseInt(existingProduct.quantity, 10);
        const newQuantity = parseInt(productData.quantity, 10);
        const updatedProduct = await productCollection.updateOne(
            {brand: productData.brand, model: productData.model, category: productData.category},
            {$set: { quantity: existingQuantity + newQuantity}});
        res.send("Product quantity updated successfully!");
    }
    else{
        const insertedProduct = await productCollection.insertMany(productData);
    }    
};
    


exports.getUpdateProduct = async (req, res) => {
    try{
        const listProducts = await productCollection.find({}, {"__v": false});
        res.render('updateProduct', {listProducts});
    }catch(err){
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};
exports.updateProduct = async (req, res) => {
    const newProductData = {
        category: req.body.category,
        brand: req.body.brand,
        model: req.body.model,
        quantity: req.body.quantity,
        buyingDate: req.body.buyingDate
    }

    const selectedProductId  = req.body.option;

    try {
        const updatedProduct = await productCollection.updateOne(
            { _id: selectedProductId },
            { $set: newProductData }
        );
        res.status(200).send('Product updated successfully!');
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }    
}



exports.getDeleteProduct = async (req, res) => {
    try{
        const listProducts = await productCollection.find({}, {"__v": false});
        res.render('deleteProduct', {listProducts});
    }catch(err){
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};
exports.deleteProduct = async (req, res) => {
    const selectedProductId  = req.body.option;
    try {
        const existingProduct = await productCollection.findOne({ _id: selectedProductId});
        if(existingProduct){
            const deletedProduct = await productCollection.deleteOne({ _id: selectedProductId });
            res.status(200).send('Product deleted successfully!');
        }
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};



exports.getProducts = async (req, res) => {
    try{
        const listProducts = await productCollection.find({}, {"__v": false});
        res.render('listOfProduct', {listProducts});
    }catch(err){
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};
const userCollection = require('../models/user');
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
    res.render("login");
};
exports.login = async (req, res) => {
    try{
        const check = await userCollection.findOne({name: req.body.username});
        if(!check){
            res.send("user name not found !");
        }
        isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("choice");
        }else{
            res.send("wrong password !");
        }
    }catch(err){
        res.send("error : ",err);
    }
};



exports.getSignUp = (req, res) => {
    res.render("signup");
};
exports.signUp = async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existingUser = await userCollection.findOne({name: data.name});

    if(existingUser){
        res.send("User already exists, please choose a different username");
    }else{
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        const userdata = await userCollection.insertMany(data);
    }
}
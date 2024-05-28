const express = require("express");
const connect = require('./config/connectDB');
const path = require("path");
const dotenv = require('dotenv');
const agents = require('./routes/agentRouter');
const products = require('./routes/productRouter');
const users = require('./routes/userRouter');
const orders = require('./routes/orderRouter');


const app = express();

//convert data into JSON format
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('views', path.join(__dirname, '../frontend/views'));
//use ejs as view engine
app.set('view engine', 'ejs');
//static file
app.use(express.static(path.join(__dirname, '../frontend/public')));

dotenv.config({ path: 'backend/config/config.env' });

connect();


//routes
app.get('/', (req, res) => {
    res.render("home");
});
app.get("/choice", (req, res) => {
    res.render("choice");
});
app.use('/api', agents);
app.use('/api', products);
app.use('/api', users);
app.use('/api', orders);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port : ${process.env.PORT}`);
});
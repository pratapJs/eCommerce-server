const express = require('express')
const mongoose= require('mongoose')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser')
const expressValidator=require('express-validator')
const cors = require('cors')
require('dotenv').config()
const braintreeRoutes= require('./routes/braintree')
require('dotenv').config()

//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes=require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/Order')

//app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology: true})
.then(()=>{
console.log('DB connected')
})

//middlewares
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(expressValidator())
app.use(cookieParser())
app.use(cors())

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",braintreeRoutes);
app.use("/api",orderRoutes);

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log("Server is running on port 8000")
})
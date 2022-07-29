const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");


//Config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});  // This configs the "listen" to connect to config.env in config folder
}

app.use(express.json());   // In-built which parses the incoming data in req.body "https://dev.to/gathoni/express-req-params-req-query-and-req-body-4lpc"
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//Route Imports
var product = require("./routes/productRoute");
var user = require("./routes/userRoute");
var order = require("./routes/orderRoute");
var payment = require("./routes/paymentRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1/",order);
app.use("/api/v1/",payment);

app.use(express.static(path.join(__dirname,"/frontend/build")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
});

//MiddleWare for Error
app.use(errorMiddleware);

module.exports = app;
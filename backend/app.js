const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());   // In-built which parses the incoming data in req.body "https://dev.to/gathoni/express-req-params-req-query-and-req-body-4lpc"
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//Route Imports
var product = require("./routes/productRoute");
var user = require("./routes/userRoute");
var order = require("./routes/orderRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1/",order)


//MiddleWare for Error
app.use(errorMiddleware);

module.exports = app;
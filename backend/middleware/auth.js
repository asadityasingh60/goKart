const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

//checks Is logged in
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;     // Token created by getJWTToken method is stored in cookies, every account has their set of cookies of website

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);             //Compares JWTToken's signature with JWT_SECRET Code

  req.user = await User.findById(decodedData.id);
  //https://github.com/auth0/node-jsonwebtoken

  next();
});


// This is function is used so that only Admin has the access to few productRoutes
exports.authorizeRoles = (...roles)=>{
  return (req,res,next)=>{

    if(!roles.includes(req.user.role)){
      return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403)
    )};
    next();
  };
};
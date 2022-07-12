const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures")


//CreateProduct --Admin
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

    req.body.user = req.user.id;      
    // Admin requested to create the Product so req.user.id contain Admin's id
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});


//Get All Product or Render All Product on Main Page
exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query)    // (query, queryStr)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount
    }); 
});


//Get Product Details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{

    
    const product = await Product.findById(req.params.id);

    if(!product){
        return new ErrorHandler("Product Not Found",404);
    }

    res.status(200).json({
        success:true,
        product,
    });
});



//Update a Product details --Admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = Product.findById(req.params.id);

    if(!product){
        return new ErrorHandler("Product Not Found",404);
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators: true,      // Built in Mongoose Validator checks whether every required:true objec of schema is given or not
        useFindAndModify: false
    });

    res.status(200).json({
        success:true,
        product
    });
});


//Delete A Product --Admin
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return new ErrorHandler("Product Not Found",404);
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message: "Product Deleted Successfully"
    });
});


//Create New Review or Update the Review
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{

    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev)=>{
        rev.user.toString()===rev.user._id.toString();   // rev.user is user inside Reviews which is ObjectId type =>see line 54 in productModel
    });

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===rev.user._id){      // rev.user is user inside Reviews which is ObjectId type =>see line 54 in productModel
                rev.rating = rating,
                rev.comment = comment
            }
        })
    } else {
        product.reviews.push(review);   
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;

    product.reviews.forEach((rev)=>{
        avg+=rev.rating
    });

    product.ratings = avg/product.reviews.length;

    await product.save({
        validateBeforeSave:false
    });

    res.status(200).json({
        success: true,
    })

});


//Get All Reviews
exports.getAllReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});


// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product.reviews.filter((rev) => {
        rev._id.toString() !== req.query.id.toString()
    });
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
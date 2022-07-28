const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//Create New Order
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
    const {shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(200).json({
        success: true,
        order,
    });
});

//Get Single Order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    //populate will add email and name in user section of Order model

    if(!order){
        return next(new ErrorHandler("Order Not Found",404));
    }

    res.status(200).json({
        success: true,
        order
    })
});


//My Orders
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{

    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success: true,
        orders
    })
});

 
//Get All Orders --Admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
});


// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHander("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });


async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.Stock = product.Stock - quantity;

    await product.save({validateBeforeSave: false});
}


//Delete Order --Admin
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order Not Found",404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    })
});
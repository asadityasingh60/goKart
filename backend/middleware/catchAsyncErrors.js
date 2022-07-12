const catchAsyncErrors = theFunc => (req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next)
};

module.exports = catchAsyncErrors;

// for async errors
// for example in this name field is set as required so everytime you miss writing name, system will go in infinite loop and ask for name from the user
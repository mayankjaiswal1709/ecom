const productSchema = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middlewear/catchAsyncErrors");
const Apifeatures = require("../utils/apifeatures");



// create Product --Admin
exports.createProduct = catchAsyncErrors(
    async(req,res,next)=>{

        req.body.user =req.user.id;
        const product = await productSchema.create(req.body);
        res.status(200).json({
             success: true,
            product,
            message: "product added successfully"
        })
    }
);

// Get all Product
exports.getAllProducts = catchAsyncErrors( async(req,res)=>{

const resultPerPage =5;    
const productCount = await productSchema.countDocuments();
const apiFeatures = new Apifeatures(productSchema.find(),req.query)
.search()
.filter()
.pagination(resultPerPage);

    const   product = await apiFeatures.query;
    res.status(200).json({
        success: true,
                message: "all product list below",
                product,
                productCount,
    })
});

// update product
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{

   let product = await productSchema.findById(req.params.id);

   if(!product){
    return next(new ErrorHandler("Product not found",404));
}

product = await productSchema.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators : true,
    useFindAndModify:false
    });
    res.status(200).json({
        success: true,
        message: "Product updated successfully"
    })
});

// Delete

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await productSchema.findByIdAndDelete(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    else{
        res.status(200).json({
            success: true,
             message: "Producted Deleted Successfully",
         })
    }

});

// get Product Details
exports.getProductDetails =catchAsyncErrors(async(req,res,next)=>{
    const product = await productSchema.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success: true,
         product,
     });
});
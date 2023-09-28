const ErrorHandler = require("../utils/errorhandler");

module.exports =(err,req,res,next)=>{
    err.statusCode =err.statusCode || 500;
    err.message =err.message || "Internal Server Error";

    // Wrong MongodB Id Error
    if (err.name ==="CastError"){
        const message = `Resourse not found Invalid:${err.path}`;
        err = new ErrorHandler(message,400);
    }

// mongoose Duplicate key error 
if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message,400);
}

  // Wrong  JWT Error
  if (err.name ==="JsonWebTokenError"){
    const message = `Json Web Token is Invalid ,Try Again `;
    err = new ErrorHandler(message,400);
}
  // JWT Expire  Error
  if (err.name ==="JsonWebTokenError"){
    const message = `Json Web Token is Expire ,Try Again `;
    err = new ErrorHandler(message,400);
}

    res.status(err.statusCode).json({
        success:false,
        message :err.message,
    });
};
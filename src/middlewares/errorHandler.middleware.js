const ErrorHandler = require("../utils/ErrorHandler")

const errorHandler = async(err,req,res,next) => {
    const error = new ErrorHandler(err);
    res.status(error.statusCode).send(error.message);
}

module.exports = errorHandler
class ErrorHandler extends Error{
    errorCodes = {
        clientError: 400,
        serverError :500,
    }

    constructor(error, statusCode=500){
        super(error.message);
        if(error.name){
            if(error.name==="apollo.model.validator.invalidvalue"){
                this.message = "Invalid Value"
                this.statusCode = 400
            }else if(error.name==="TypeError"){
                this.statusCode = 400
                this.message = error.name+" : "+ error.message
            }else{
                if(error.message = "Invalid string representation of Uuid, it should be in the 00000000-0000-0000-0000-000000000000"){
                    this.statusCode = 400;
                }
                else{
                    this.statusCode=500;
                }
                this.message=error.name+" : "+error.message
            }
        }else{
            this.message = "Internal Server Error"
            this.statusCode = statusCode;
        }
    }
}

module.exports = ErrorHandler
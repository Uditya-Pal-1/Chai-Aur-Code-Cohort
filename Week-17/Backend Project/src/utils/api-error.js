class apiError extends Error {

    /**
     * @param {number} statusCode
     * @param {string} message
     * @param {any[]} error
     * @param {string} stack
     */
    constructor(
        statusCode,
        message ='something went wrong',
        error =[],
        stack ="",
    ){
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.error = error;
        this.success = false;
        this.message = message;
        if(stack) {
            this.stack = stack;
        }else(
            Error.captureStackTrace(this, this.constructor) // Error.captureStackTrace(this, this.constructor) is called to generate a stack trace automatically.
        )
    }
}

export {apiError};
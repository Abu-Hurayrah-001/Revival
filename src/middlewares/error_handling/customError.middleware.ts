//CUSTOM ERROR
class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "CustomError";

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        };
    };
};

export default CustomError;
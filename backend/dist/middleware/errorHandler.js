class CustomError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = this.constructor.name;
    }
}
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            message: err.message,
            details: err.details || 'No additional details',
        });
    }
    console.error(err);
    res.status(500).json({
        message: 'An unexpected error occurred',
    });
};
export default errorHandler;

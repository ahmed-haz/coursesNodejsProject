const appError = require("../utils/appError");

const asyncWrapper = (AsyncFn) => {
    return (req, res, next) => {
        AsyncFn(req, res, next).catch((err) => {
            const error = appError.create(err.message, 500, "error");
            next(error);
        })
    }
}

module.exports = asyncWrapper;
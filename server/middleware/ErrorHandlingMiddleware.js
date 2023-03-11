const createError = require('http-errors');

// error handler is last middleware, hence next() is not used
// @ts-ignore
const errorHandler = function (err, req, res, next) {
    let status = err.status || 500;
    let errors = err.errors || [];

    let env = process.env.NODE_ENV || 'development';
    return res.status(status).json({ name: err.name, message: err.message,
        errors: errors, stack: env === 'development' ? err.stack : undefined });
}

module.exports = errorHandler;
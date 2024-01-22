function methodNotAllowed(req, res, next) {
    next({
        status: 405,
        message: `${req.method} method is not supported on ${req.originalUrl}`
    });
};

module.exports = methodNotAllowed;
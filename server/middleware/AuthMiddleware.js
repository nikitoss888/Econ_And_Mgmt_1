const ApiError = require('../errors/ApiError');
const jwt = require('jsonwebtoken');

// @ts-ignore
// res is not used
const auth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return next(ApiError.unauthorized('Користувач не авторизований'));
        }

        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch (e) {
        return next(ApiError.unauthorized('Немає доступу'));
    }
}

module.exports = auth;
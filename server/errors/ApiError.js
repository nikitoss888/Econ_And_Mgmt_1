class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
        this.status = status;
        this.errors = errors;
    }

    static badRequest(message = 'Помилка в запиті', errors = []) {
        return new ApiError(400, message, errors);
    }

    static unauthorized(message = 'Неавторизований запит', errors = []) {
        return new ApiError(401, message, errors);
    }

    static forbidden(message = 'Доступ заборонено', errors = []) {
        return new ApiError(403, message, errors);
    }

    static notFound(message = 'Сторінка не знайдена', errors = []) {
        return new ApiError(404, message, errors);
    }

    static internal(message = 'Внутрішня помилка сервера', errors = []) {
        return new ApiError(500, message, errors);
    }

    static serviceUnavailable(message = 'Сервіс недоступний', errors = []) {
        return new ApiError(503, message, errors);
    }
}

module.exports = ApiError;
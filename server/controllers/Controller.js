const { ValidationError: SequelizeValidationError } = require("sequelize");
const ApiError = require("../errors/ApiError");

class Controller {
    exceptionHandle(e) {
        if (e instanceof SequelizeValidationError) {
            return ApiError.badRequest(e.name, e.errors);
        }
        else if (e instanceof ApiError) {
            return e;
        }
        else if (e instanceof Error) {
            return ApiError.internal(e.message);
        }
        else return ApiError.internal("Помилка обробки запиту");
    }

    parseDate(date) {
        if (!date) return undefined;
        return new Date(date);
    }

    parseNumber(number) {
        if (!number) return undefined;
        return Number(number);
    }

    parseBoolean(boolean) {
        if (boolean === undefined) return undefined;
        if (!boolean) return false;
        return [true, 'true', 'True', 'on', 'yes', '1', 1].includes(boolean);
    }

    parsePagination(desc, descending, limit)
    {
        let controller = new Controller();

        let descendingParsed;
        if (desc) descendingParsed = controller.parseBoolean(desc);
    else descendingParsed = controller.parseBoolean(descending);

        let limitParsed = controller.parseNumber(limit);
        let pageParsed = Math.max(controller.parseNumber(page) || 1, 1);

        return { descending: descendingParsed, limit: limitParsed, page: pageParsed - 1 };
    }
}

module.exports = Controller;
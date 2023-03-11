const Controller = require('./Controller');
const {User} = require('../models');
const ApiError = require('../errors/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 5;
class UserController extends Controller {
    static generateJwt(id, login) {
        return jwt.sign({
            id, login
        }, process.env.SECRET_KEY, {expiresIn: '24h'});
    }

    static async _validateData(login, password) {
        if (!login || !password) {
            throw ApiError.badRequest('Не всі поля заповнені');
        }

        await UserController._checkCandidate(login).catch((e) => { throw e });
        await UserController._checkPassword(password).catch((e) => { throw e });

        const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

        return [ login, hashPassword ];
    }

    static async _checkCandidate(login = '') {
        const candidate = await User.findOne({ where: {login} });
        if (candidate) {
            throw ApiError.badRequest('Користувач з таким email або логіном вже існує');
        }
    }

    static async _checkPassword(password) {
        if (password.length < 6) {
            throw ApiError.badRequest('Пароль має бути не менше 6 символів');
        }

        let passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/);
        if (!passwordRegex.test(password)) {
            throw ApiError.badRequest('Пароль повинен містити хоча б одну велику літеру, ' +
                'одну малу літеру та одну цифру');
        }
    }
    async register(req, res, next) {
        try {
            const {login, password} = req.body;

            const [loginValid, hashPasswordValid] =
                await UserController._validateData(login, password)
                    .catch((e) => { return next(super.exceptionHandle(e)) });

            const user = await User.create({ login: loginValid, password: hashPasswordValid })
                .catch((e) => { return next(super.exceptionHandle(e)) });

            let token = UserController.generateJwt(user.id, user.login);

            return res.json({token});
        } catch (e) {
            return next(super.exceptionHandle(e));
        }
    }

    async login(req, res, next) {
        const {login, password} = req.body;

        if (!login || !password) {
            return next(ApiError.badRequest('Не всі поля заповнені'));
        }

        const user = await User.findOne({ where: {login} })
            .catch((e) => { return next(super.exceptionHandle(e)) });

        if (!user) {
            return next(ApiError.badRequest('Користувач не знайдений'));
        }

        let isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return next(ApiError.badRequest('Невірний пароль'));
        }

        let token = UserController.generateJwt(user.id, user.login);

        return res.json({token});
    }

    async auth(req, res, next) {
        const token = UserController.generateJwt(req.user.id, req.user.login);
        return res.json({token});
    }

    async check(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(ApiError.unauthorized('Помилка авторизації'));
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return next(ApiError.unauthorized('Помилка авторизації'));
            }
            return res.json({decoded});
        });
    }
}

module.exports = new UserController();
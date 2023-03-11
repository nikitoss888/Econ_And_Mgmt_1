const Controller = require("./Controller");
const {Brief} = require("../models");
const ApiError = require("../errors/ApiError");

class BriefController extends Controller {
    async create(req, res, next) {
        try {
            const {name, description, budget, deadline, client, functionality, platforms, integrations,
                design, security, architecture, database, scalability, performance, testing, deployment,
                maintenance, additional} = req.body;

            const brief = await Brief
                .create({name, description, budget, deadline, client, functionality,
                    platforms, integrations, design, security, architecture, database, scalability, performance,
                    testing, deployment, maintenance, additional})
                .catch(e => {
                    return next(super.exceptionHandle(e));
                });

            if (!brief) {
                return next(ApiError.badRequest('Помилка створення брифу'));
            }

            return res.json(brief);
        } catch (e) {
            return next(super.exceptionHandle(e));
        }
    }

    async getAll(req, res, next) {
        try {
            const briefs = await Brief
                .findAll()
                .catch(e => {
                    return next(super.exceptionHandle(e));
                });

            if (!briefs) {
                return next(ApiError.internal('Помилка отримання брифів'));
            }

            return res.json(briefs);
        } catch (e) {
            return next(super.exceptionHandle(e));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;

            const parsedId = super.parseNumber(id);

            const brief = await Brief
                .findByPk(parsedId)
                .catch(e => {
                    return next(super.exceptionHandle(e));
                });

            if (!brief) {
                return next(ApiError.badRequest('Бриф не знайдено'));
            }

            return res.json(brief);
        } catch (e) {
            return next(super.exceptionHandle(e));
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name, description, budget, deadline, client, functionality, platforms, integrations,
                design, security, architecture, database, scalability, performance, testing, deployment,
                maintenance, additional} = req.body;

            const parsedId = super.parseNumber(id);

            const brief = await Brief.findByPk(parsedId);
            if (!brief) {
                return next(ApiError.badRequest('Бриф не знайдено'));
            }

            brief.name = name;
            brief.description = description;
            brief.budget = budget;
            brief.deadline = deadline;
            brief.client = client;
            brief.functionality = functionality;
            brief.platforms = platforms;
            brief.integrations = integrations;
            brief.design = design;
            brief.security = security;
            brief.architecture = architecture;
            brief.database = database;
            brief.scalability = scalability;
            brief.performance = performance;
            brief.testing = testing;
            brief.deployment = deployment;
            brief.maintenance = maintenance;
            brief.additional = additional;

            const result = await brief.save()
                .catch(e => {
                    return next(super.exceptionHandle(e));
                });

            return res.json(result);
        } catch (e) {
            return next(super.exceptionHandle(e));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;

            const parsedId = super.parseNumber(id);

            const result = await Brief
                .destroy({where: {id: parsedId}})
                .catch(e => {
                    return next(super.exceptionHandle(e));
                });

            return res.json(result);
        } catch (e) {
            return next(super.exceptionHandle(e));
        }
    }
}

module.exports = new BriefController();
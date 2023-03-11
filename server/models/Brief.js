const sequelize_db = require('../db');
const {DataTypes} = require('sequelize');

const Brief = sequelize_db.define('brief', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    budget: {type: DataTypes.TEXT, allowNull: false},
    deadline: {type: DataTypes.TEXT, allowNull: false},
    client: {type: DataTypes.STRING, allowNull: false},
    functionality: {type: DataTypes.TEXT, allowNull: false},
    platforms: {type: DataTypes.TEXT, allowNull: false},
    integrations: {type: DataTypes.TEXT, allowNull: false},
    design: {type: DataTypes.TEXT, allowNull: false},
    security: {type: DataTypes.TEXT, allowNull: false},
    architecture: {type: DataTypes.TEXT, allowNull: false},
    database: {type: DataTypes.TEXT, allowNull: false},
    scalability: {type: DataTypes.TEXT, allowNull: false},
    performance: {type: DataTypes.TEXT, allowNull: false},
    testing: {type: DataTypes.TEXT, allowNull: false},
    deployment: {type: DataTypes.TEXT, allowNull: false},
    maintenance: {type: DataTypes.TEXT, allowNull: false},
    additional: {type: DataTypes.TEXT, allowNull: true},
});

module.exports = Brief;
const sequelize_db = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize_db.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
});

module.exports = User;
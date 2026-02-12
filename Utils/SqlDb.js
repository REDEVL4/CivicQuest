const { Sequelize, Model, DataTypes } = require("sequelize");
const sequilize = new Sequelize("sqlite::memory:");
module.exports = sequilize
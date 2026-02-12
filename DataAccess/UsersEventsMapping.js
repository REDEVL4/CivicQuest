const {DataTypes} = require('sequelize')
const sequilize = require('../Utils/SqlDb')
const Event = require('./Event')
const User = require('./User')
const UsersEventsMapping = sequilize.define(
  "UsersEventsMapping",
  {

  }
);
module.exports = UsersEventsMapping

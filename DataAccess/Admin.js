const {DataTypes} = require('sequelize')
const sequilize = require('../Utils/SqlDb')
const Admin = sequilize.define(
  "Admin",
  {
    AdminId:
    {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    FirstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    LastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }
);
module.exports = Admin;

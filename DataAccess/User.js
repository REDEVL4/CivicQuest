const {DataTypes} = require('sequelize')
const sequilize = require('../Utils/SqlDb')
const User = sequilize.define(
  "User",
  {
    UserId:
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
    Password:
    {
     allowNull:true,
     type: DataTypes.STRING  
    },
    PhoneNumber:
    {
        allowNull:false,
        type:DataTypes.STRING,
        defaultValue:"0000000000"
    },
    Location:
    {
        allowNull: false,
        type: DataTypes.STRING,  
    },
    City:
    {
        allowNull: false,
        type: DataTypes.STRING,  
    },
    State:
    {
        allowNull: false,
        type: DataTypes.STRING,  
    },
    isSubscribed:
    {
      allowNull:true,
      type:DataTypes.BOOLEAN
    },
    Interest:
    {
        allowNull:true,
        type:DataTypes.STRING
    },
    isInterestedInSponsoring:
    {
      allowNull:false,
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    isRegistered:
    {
      allowNull:false,
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }

  }
);
module.exports = User;

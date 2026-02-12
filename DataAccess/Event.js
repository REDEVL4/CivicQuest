const {DataTypes} = require('sequelize')
const sequilize = require('../Utils/SqlDb')
//   {eventId:'1',eventTitle:'Event 1',eventDescription:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',eventDateTime:'23 April 2023',
//maxNoOfSeats:'1000',noOfParticipentsRegistered:'890',City:'Warrangal',Location:'Synergy Park,Hyderab ',status:'closed'},
const Event = sequilize.define(
  "Event",
  {
    EventId:
    {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    Title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    EventDateTime:
    {
        allowNull:false,
        type: DataTypes.DATE,
    },
    MaxNoOfSeats: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    NoOfParticipentsRegistered:
    {
        allowNull: false,
        type: DataTypes.INTEGER,  
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
    Status:
    {
        allowNull: false,
        type: DataTypes.STRING,  
    },
    Categories:
    {
        allowNull:true,
        type:DataTypes.STRING
    },
    Images:
    {
      allowNull:true,
      type:DataTypes.STRING      
    },
  }
);
module.exports = Event;

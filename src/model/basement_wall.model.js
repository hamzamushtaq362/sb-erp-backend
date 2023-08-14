const { Sequelize, DataTypes } = require("sequelize");
const doesTableExist = require('../utils')

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

// Define the BasementWall model
const BasementWall = sequelize.define("basement_wall", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  length: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  thickness: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  xAxisBars: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  yAxisBars: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rightLeft:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});


// Create the BasementWall table in the database (if it doesn't exist)

// BasementWall.sync().then(() => {
//     console.log('BasementWall table created');
// });

doesTableExist("basement_walls")
  .then((exists) => {
    if (exists) {
      console.log("BasementWall Table exists.");
    } else {
      console.log("BasementWall Table does not exist.");
      BasementWall.sync().then(() => {
            console.log('BasementWall table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = BasementWall ;

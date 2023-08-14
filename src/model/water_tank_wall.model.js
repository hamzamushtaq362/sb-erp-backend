const { Sequelize, DataTypes } = require("sequelize");
const doesTableExist = require('../utils');

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

// Define the WaterTankWall model
const WaterTankWall = sequelize.define("water_tank_wall", {
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


// Create the WaterTankWall table in the database (if it doesn't exist)

// WaterTankWall.sync().then(() => {
//     console.log('WaterTankWall table created');
// });

doesTableExist("water_tank_walls")
  .then((exists) => {
    if (exists) {
      console.log("Water Tank Wall Table exists.");
    } else {
      console.log("Water Tank Wall Table does not exist.");
      WaterTankWall.sync().then(() => {
            console.log('Water Tank Wall table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = WaterTankWall ;

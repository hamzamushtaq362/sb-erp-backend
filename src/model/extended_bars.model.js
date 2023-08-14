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

// Define the ExtendedBars model
const ExtendedBars = sequelize.define("extended_bar", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  length: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  width: {
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
});


// Create the ExtendedBars table in the database (if it doesn't exist)

// ExtendedBars.sync().then(() => {
//     console.log('ExtendedBars table created');
// });

doesTableExist("extended_bars")
  .then((exists) => {
    if (exists) {
      console.log("Extended Bars Table exists.");
    } else {
      console.log("Extended Bars Table does not exist.");
      ExtendedBars.sync().then(() => {
            console.log('Extended Bars table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = ExtendedBars ;

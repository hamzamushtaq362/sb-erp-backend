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

// Define the FootingColumn model
const StairColumn = sequelize.define("stair_column", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  width: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  thickness: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  yAxis: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  xAxis: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});


// Create the StairColumn table in the database (if it doesn't exist)

// StairColumn.sync().then(() => {
//     console.log('StairColumn table created');
// });

doesTableExist("stair_columns")
  .then((exists) => {
    if (exists) {
      console.log("stair Column Table exists.");
    } else {
      console.log("stair Column Table does not exist.");
      StairColumn.sync().then(() => {
            console.log('stair Column table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = StairColumn ;

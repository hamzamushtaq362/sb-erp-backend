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

// Define the StairSlab model
const StairSlab = sequelize.define("stair_slab", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  length: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  thickness: {
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
  extendedBars: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  extWidth: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  extLength: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  extXAxisBars: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  extYAxisBars: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

// Create the StairSlab table in the database (if it doesn't exist)

// StairSlab.sync().then(() => {
//     console.log('StairSlab table created');
// });

doesTableExist("stair_slabs")
  .then((exists) => {
    if (exists) {
      console.log("Stair Slab Table exists.");
    } else {
      console.log("Stair Slab Table does not exist.");
      StairSlab.sync().then(() => {
            console.log('Stair Slab table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = StairSlab ;

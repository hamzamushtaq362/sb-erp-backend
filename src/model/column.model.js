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

// Define the Column model
const Column = sequelize.define("column", {
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
  bars: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ring: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


// Create the Column table in the database (if it doesn't exist)

// Column.sync().then(() => {
//     console.log('Column table created');
// });

doesTableExist("columns")
  .then((exists) => {
    if (exists) {
      console.log("Column Table exists.");
    } else {
      console.log("Column Table does not exist.");
      Column.sync().then(() => {
            console.log('Column table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = Column ;

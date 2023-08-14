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

// Define the Footing model
const Footing = sequelize.define("footing", {
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
  length: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  mainBars: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  distBars: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  topBottom:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }, 
});


// Create the Footing table in the database (if it doesn't exist)

// Footing.sync().then(() => {
//     console.log('Footing table created');
// });

doesTableExist("footings")
  .then((exists) => {
    if (exists) {
      console.log("Footing Table exists.");
    } else {
      console.log("Footing Table does not exist.");
      Footing.sync().then(() => {
            console.log('Footing table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = Footing ;

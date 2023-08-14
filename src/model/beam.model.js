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

// Define the Beam model
const Beam = sequelize.define("beam", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  slabId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  beemId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  length: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  thickness: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ring: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  down: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


// Create the Beam table in the database (if it doesn't exist)

// Beam.sync().then(() => {
//     console.log('Beam table created');
// });

doesTableExist("beams")
  .then((exists) => {
    if (exists) {
      console.log("Beam Table exists.");
    } else {
      console.log("Beam Table does not exist.");
      Beam.sync().then(() => {
            console.log('Beam table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = Beam ;

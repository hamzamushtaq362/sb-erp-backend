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

// Define the LintelBeam model
const LintelBeam = sequelize.define("lintel_beam", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  barLayers: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bottomBar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ring: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


// Create the LintelBeam table in the database (if it doesn't exist)

// LintelBeam.sync().then(() => {
//     console.log('LintelBeam table created');
// });

doesTableExist("lintel_beams")
  .then((exists) => {
    if (exists) {
      console.log("LintelBeam Table exists.");
    } else {
      console.log("LintelBeam Table does not exist.");
      LintelBeam.sync().then(() => {
            console.log('LintelBeam table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = LintelBeam ;

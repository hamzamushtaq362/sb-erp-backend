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

// Define the ConcileBeam model
const ConcileBeam = sequelize.define("concile_beam", {
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


// Create the ConcileBeam table in the database (if it doesn't exist)

// ConcileBeam.sync().then(() => {
//     console.log('ConcileBeam table created');
// });

doesTableExist("concile_beams")
  .then((exists) => {
    if (exists) {
      console.log("ConcileBeam Table exists.");
    } else {
      console.log("ConcileBeam Table does not exist.");
      ConcileBeam.sync().then(() => {
            console.log('ConcileBeam table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = ConcileBeam ;

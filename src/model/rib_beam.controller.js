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

// Define the RibBeam model
const RibBeam = sequelize.define("rib_beam", {
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


// Create the RibBeam table in the database (if it doesn't exist)

// RibBeam.sync().then(() => {
//     console.log('RibBeam table created');
// });

doesTableExist("rib_beams")
  .then((exists) => {
    if (exists) {
      console.log("Rib_Beam Table exists.");
    } else {
      console.log("Rib_Beam Table does not exist.");
      RibBeam.sync().then(() => {
            console.log('Rib_Beam table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = RibBeam ;

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

// Define the User model
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnic: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


// Create the User table in the database (if it doesn't exist)

// User.sync().then(() => {
//     console.log('User table created');
// });

doesTableExist("users")
  .then((exists) => {
    if (exists) {
      console.log("User Table exists.");
    } else {
      console.log("User Table does not exist.");
      User.sync().then(() => {
            console.log('User table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = User ;

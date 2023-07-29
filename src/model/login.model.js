const { Sequelize, DataTypes } = require('sequelize');
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
const Login = sequelize.define("login", {
  cnic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Create the Login table in the database (if it doesn't exist)
// Login.sync().then(() => {
//     console.log('Login table created');
// });

doesTableExist("logins")
  .then((exists) => {
    if (exists) {
      console.log("Login Table exists.");
    } else {
      console.log("Login Table does not exist.");
      Login.sync().then(() => {
        console.log("Login table created");
      });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = Login;
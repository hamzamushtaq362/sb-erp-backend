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

const Customer = sequelize.define("customer", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    houseNo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    area:{
        type:DataTypes.STRING,
        allowNull:false
    },
    province:{
        type:DataTypes.STRING,
        allowNull:false
    },
})

// Customer.sync().then(() => {
//     console.log('Customer table created');
// });

doesTableExist("customers")
  .then((exists) => {
    if (exists) {
      console.log("Customer Table exists.");
    } else {
      console.log("Customer Table does not exist.");
      Customer.sync().then(() => {
            console.log('Customer table created');
        });
    }
  })
  .catch((error) => {
    console.error("Error checking table existence:", error);
  });

module.exports = Customer ;
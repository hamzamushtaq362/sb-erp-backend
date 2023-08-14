const {
  createBasementWall
}= require("./basementWall");

const {
  getCustomer,
  getCustomers,
  createCustomers,
  deleteCustomers,
  updateCustomers,
  usersExcel,
  fileData,
  createBeams,
} = require("./customer");

const {
  createColumn
}= require("./column");

const {
  createConcile
}= require("./concileBeam");

const {
  createExtendedBars
}= require("./extendedBars");

const {
  createFooting
}= require("./footing");

const {
  createStairColumn
}= require("./stairColumn");

const {
  createLental
}= require("./lentalBeam");

const {
  createRibBeam
}= require("./ribBeam");

const {
  createStairSlab
}= require("./stairSlab");

const {
  signup,
  login,
  sayHello,
  getUsers,
  user,
  updateUser,
  deleteUser,
} = require("./user");

const {
  createWaterTankWall
}= require("./waterTankWall");

module.exports = {
  createBasementWall,
  getCustomer,
  getCustomers,
  createCustomers,
  deleteCustomers,
  updateCustomers,
  usersExcel,
  fileData,
  createBeams,
  createColumn,
  createConcile,
  createExtendedBars,
  createFooting,
  createStairColumn,
  createLental,
  createRibBeam,
  createStairSlab,
  signup,
  login,
  sayHello,
  getUsers,
  user,
  updateUser,
  deleteUser,
  createWaterTankWall,
};

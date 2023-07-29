const {
  getCustomer,
  getCustomers,
  createCustomers,
  deleteCustomers,
  updateCustomers,
  usersExcel,
} = require("./customer.controller");

const {
  signup,
  login,
  sayHello,
  getUsers,
  user,
  updateUser,
  deleteUser,
} = require("./user.controller");

module.exports = {
  getCustomer,
  getCustomers,
  createCustomers,
  deleteCustomers,
  updateCustomers,
  usersExcel,
  signup,
  login,
  sayHello,
  getUsers,
  user,
  updateUser,
  deleteUser,
};

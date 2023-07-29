const Customer = require("../model/customer.model");
const XLSX = require("xlsx");
const path = require('path');

const getCustomers = async function (req, res) {
  try {
    const customer = await Customer.findAll();

    if (customer.length == 0) {
      return res.status(404).json({
        message: "Customers doesnot exist",
      });
    }

    return res.status(200).json({
      message: "List of customers",
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const getCustomer = async function (req, res) {
  try {
    const customerId = req.params.id;

    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      message: "Customer Found",
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const createCustomers = async function (req, res) {
  try {
    const { firstName, lastName, houseNo, city, area, province } = req.body;
    const customer = await Customer.create({
      firstName,
      lastName,
      houseNo,
      city,
      area,
      province,
    });

    return res.status(200).json({
      message: "Customer Added successfully",
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const updateCustomers = async function (req, res) {
  try {
    const customerId = req.params.id;
    const updatedData = req.body;
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({
        error: "Customer not found",
      });
    }

    await customer.update(updatedData);
    console.log("Data updated successfully");
    res.json({
      message: "Data updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteCustomers = async function (req, res) {
  try {
    const customerId = req.params.id;

    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    await customer.destroy();
    console.log("Customer Removed successfully");
    res.status(202).json({
      message: "Customer Removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const usersExcel = async function (req, res) {
  try {
    // console.log(req.file.path)
    // const workbook = XLSX.readFile(path.resolve(__dirname, '../utils/data.xlsx'));
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets["Sheet1"];
    const data = XLSX.utils.sheet_to_json(sheet);
    // console.log(data);
    res.status(202).json({
      message: "Fetch successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomers,
  updateCustomers,
  deleteCustomers,
  usersExcel,
};

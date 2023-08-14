const Customer = require("../model/customer.model");
const Beam = require("../model/beam.model");
const XLSX = require("xlsx");
const path = require('path');

const getCustomers = async function (req, res) {
  try {
    const customer = await Customer.findAll();

    if (customer.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "Customers doesnot exist",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "List of customers",
      result: customer,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
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
        status: 404,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Customer Found",
      result: customer,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

const createCustomers = async function (req, res) {
  try {
    const { firstName, lastName, houseNo,floorLevels, city, area, province, basement } = req.body;
    const customer = await Customer.create({
      firstName,
      lastName,
      houseNo,
      floorLevels,
      city,
      area,
      province,
      basement,
    });

    return res.status(201).json({
      status: 201,
      message: "Customer Added successfully",
      result: customer,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
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
        status: 404,
        message: "Customer not found",
      });
    }

    await customer.update(updatedData);
    // console.log("Data updated successfully");
    res.status(202).json({
      status: 202,
      message: "Data updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
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
        status: 404,
        message: "Customer not found",
      });
    }

    await customer.destroy();
    // console.log("Customer Removed successfully");
    res.status(202).json({
      status: 202,
      message: "Customer Removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
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
      status: 202,
      message: "Fetch successfully",
      result: data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

const fileData = async function (req, res) {
  try {
    const {add, name}= req.body;

    res.status(202).json({
      status: 202,
      message: "List",
      name,
      result: add
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

const createBeams = async function (req, res) {
  try {
    const { slabId, beemId, length, thickness, height, barLayers, ring, down}= req.body;

    const beam = await Beam.create({
      slabId,
      beemId,
      length,
      thickness,
      height,
      ring,
      down
    });

    beam.dataValues.barLayers= barLayers;

    res.status(201).json({
      status: 201,
      message: "Beam Created successfully",
      result: beam
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
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
  fileData,
  createBeams,
};

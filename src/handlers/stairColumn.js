const { StairColumn } = require("../model");

const createStairColumn = async function (req, res) {
  try {
    const { height, width, thickness, yAxis, xAxis } = req.body;

    const stairColumn = await StairColumn.create({
      height,
      width,
      thickness,
      yAxis,
      xAxis,
    });

    res.status(201).json({
      status: 201,
      message: "Stair Column Created successfully",
      result: stairColumn,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

module.exports = {
  createStairColumn,
};

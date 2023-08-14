const { ExtendedBars } = require("../model");

const createExtendedBars = async function (req, res) {
  try {
    const { length, width, xAxisBars, yAxisBars } = req.body;

    const extendedBars = await ExtendedBars.create({
      width,
      length,
      xAxisBars,
      yAxisBars,
    });

    res.status(201).json({
      status: 201,
      message: "Extended Bars Created successfully",
      result: extendedBars,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

module.exports = {
  createExtendedBars,
};

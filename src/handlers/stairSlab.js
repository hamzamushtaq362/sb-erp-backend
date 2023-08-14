const { StairSlab } = require("../model");

const createStairSlab = async function (req, res) {
  try {
    const {
      width,
      length,
      thickness,
      xAxisBars,
      yAxisBars,
      extendedBars,
      extWidth,
      extLength,
      extXAxisBars,
      extYAxisBars,
    } = req.body;

    const stairSlab = await StairSlab.create({
      width,
      length,
      thickness,
      xAxisBars,
      yAxisBars,
      extendedBars,
      extWidth,
      extLength,
      extXAxisBars,
      extYAxisBars,
    });

    res.status(201).json({
      status: 201,
      message: "StairSlab Created successfully",
      result: stairSlab,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

module.exports = {
  createStairSlab,
};

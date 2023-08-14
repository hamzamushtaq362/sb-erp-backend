const { WaterTankWall } = require("../model");

const createWaterTankWall = async function (req, res) {
  try {
    const { length, height, thickness, xAxisBars, yAxisBars, rightLeft } = req.body;

    const waterTankWall = await WaterTankWall.create({
      length,
      height,
      thickness,
      xAxisBars,
      yAxisBars,
      rightLeft,
    });

    res.status(201).json({
      status: 201,
      message: "Water Tank Wall Created successfully",
      result: waterTankWall,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

module.exports = {
  createWaterTankWall,
};

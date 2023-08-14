const { Footing } = require("../model");

const createFooting = async function (req, res) {
  try {
    const { height, width, length, mainBars, distBars, topBottom } = req.body;

    const footing = await Footing.create({
      height,
      width,
      length,
      mainBars,
      distBars,
      topBottom,
    });

    res.status(201).json({
      status: 201,
      message: "Footing Created successfully",
      result: footing,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

module.exports = {
  createFooting,
};

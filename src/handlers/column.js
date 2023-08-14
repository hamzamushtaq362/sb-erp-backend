const { Column } = require("../model");

const createColumn = async function (req, res) {
  try {
    const { height, width, thickness, bars, ring } = req.body;

    const column = await Column.create({
        height, 
        width, 
        thickness, 
        bars, 
        ring
    });

    res.status(201).json({
      status: 201,
      message: "Column Created successfully",
      result: column,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

module.exports = {
  createColumn,
};

const { BasementWall } = require("../model");

const createBasementWall = async function (req, res) {
  try {
    const {
      sectionId,
      height,
      width,
      distributionBar,
      mainBar,
      wallHeight,
      leftBar,
      rightBar,
      lengthBass,
      waterStoper,
    } = req.body;

    const basementWall = await BasementWall.create({
      sectionId,
      height,
      width,
      distributionBar,
      mainBar,
      wallHeight,
      leftBar,
      rightBar,
      lengthBass,
      waterStoper,
    });

    res.status(201).json({
      status: 201,
      message: "Basement Wall Created successfully",
      result: basementWall,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

module.exports = {
  createBasementWall,
};

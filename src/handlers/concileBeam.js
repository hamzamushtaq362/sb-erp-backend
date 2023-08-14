const {ConcileBeam} = require("../model");

const createConcile = async function (req, res) {
  try {
    const {
      beemId,
      length,
      thickness,
      height,
      barLayers,
      bottomBar,
      ring,
    } = req.body;

    const concileBeam = await ConcileBeam.create({
      beemId,
      length,
      thickness,
      height,
      barLayers,
      bottomBar,
      ring,
    });

    res.status(201).json({
      status: 201,
      message: "Concile_Beam Created successfully",
      result: concileBeam,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

module.exports = {
    createConcile
}
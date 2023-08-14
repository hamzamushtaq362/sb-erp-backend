const {LintelBeam} = require("../model");

const createLental = async function (req, res) {
  try {
    const lintelBeam = {
      beemId,
      length,
      thickness,
      height,
      barLayers,
      bottomBar,
      ring,
    } = req.body;

    // const lintelBeam = await LintelBeam.create({
    //   beemId,
    //   length,
    //   thickness,
    //   height,
    //   barLayers,
    //   bottomBar,
    //   ring,
    // });

    res.status(201).json({
      status: 201,
      message: "Lintel_Beam Created successfully",
      result: lintelBeam,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

module.exports = {
    createLental
}
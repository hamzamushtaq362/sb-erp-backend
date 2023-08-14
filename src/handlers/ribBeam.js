const {RibBeam} = require("../model");

const createRibBeam = async function (req, res) {
    try {
      const {slabId, beemId, length, thickness, height, barLayers, bottomBar, ring}= req.body;
  
      const ribBeam = await RibBeam.create({
        slabId,
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
        message: "Rib_Beam Created successfully",
        result: ribBeam
      });
  
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Server error",
      });
    }
  };

  module.exports={
    createRibBeam
  }
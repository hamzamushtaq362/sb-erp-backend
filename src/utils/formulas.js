const formatToFeet = (val, cond) => {
  if (val) {
    const newVal = cond ? val.split(" ") : val.split("-");
    const feet = parseFloat(newVal[0].split("'")[0]);
    const inch_temp = newVal[1].split(" ");
    let inch = 0.0;
    if (inch_temp.length === 2) {
      const l = parseFloat(inch_temp[0]);
      const r = parseFloat(eval(inch_temp[1].split('"')[0]));
      inch = l + r;
      inch /= 12;
    } else {
      const n = parseFloat(eval(inch_temp[0].split('"')[0]));
      inch = n / 12;
    }

    return feet + inch;
  }
  return 0;
};

const wallCFT = (data, height, thickness) => {
  let length = 0;
  data.forEach((i) => {
    const inFeet = formatToFeet(i?.Length, false);
    length += inFeet;
  });
  return length * height * thickness;
};

const calculateBricks = (wallcft) => wallcft * 13.5;

const dryMaterial = (totalcft) => {
  const thirtyPercent = (30 / 100) * totalcft;
  return thirtyPercent;
};

const calculateSandCft = (sandPortion, cementPortion, drymaterial) => {
  const totalPortion = sandPortion + cementPortion;
  return (sandPortion / totalPortion) * drymaterial;
};

const calculateCementBags = (sandPortion, cementPortion, drymaterial) => {
  const totalPortion = sandPortion + cementPortion;
  const cementCft = (cementPortion / totalPortion) * drymaterial;
  return cementCft / 1.25;
};

const calculateSandCft3 = (
  sandPortion,
  cementPortion,
  thirdPortion,
  drymaterial
) => {
  const totalPortion = sandPortion + cementPortion + thirdPortion;
  return (sandPortion / totalPortion) * drymaterial;
};

const calculateCementBags3 = (
  sandPortion,
  cementPortion,
  thirdPortion,
  drymaterial
) => {
  const totalPortion = sandPortion + cementPortion + thirdPortion;
  const cementCft = (cementPortion / totalPortion) * drymaterial;
  console.log(cementCft, "cementCft");
  return cementCft * 1.25;
};
const calculateBajarCft3 = (
  sandPortion,
  cementPortion,
  thirdPortion,
  drymaterial
) => {
  const totalPortion = sandPortion + cementPortion + thirdPortion;
  console.log((thirdPortion / totalPortion) * drymaterial, "bajar Cft");

  return (thirdPortion / totalPortion) * drymaterial;
};

const foundationReader = (data) => {
  //replaced data[] with data
  const chars = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const charIndex = chars.indexOf(
    data
      .filter(
        (i) =>
          i?.Layer.includes("Height") &&
          i.Length != null &&
          i?.Layer.split(" ").length === 1
      )
      .sort((a, b) => {
        if (a?.Layer > b?.Layer) {
          return -1;
        } else if (a?.Layer < b?.Layer) {
          return 1;
        }
        return 0;
      })[0]
      ?.Layer.split("Height")[1]
  );

  const dataValues = {};
  data.forEach((i) => {
    for (let index = 0; index <= charIndex; index++) {
      if (
        (i.Layer === `Height${chars[index]}` && i.Length != null) ||
        (i.Layer === `Step${chars[index]}` && i.Length != null) ||
        (i.Layer === `Wall${chars[index]}` && i.Length != null) ||
        (i.Layer === `P.c.c${chars[index]}` && i.Length != null)
      ) {
        if (dataValues[chars[index]]) {
          dataValues[chars[index]].push(i);
        } else {
          dataValues[chars[index]] = [i];
        }
      }
    }
  });
  let totalStepCft = 0;
  let totalPccCft = 0;
  let totalWallCft = 0;
  Object.keys(dataValues).map((char) => {
    let stepWallLength = 0;
    let stepCft = 0;
    let pccCft = 0;
    let foundationWallCft = 0;
    let is3 = false;
    let is6 = false;
    dataValues[char].map((i) => {
      if (i?.Layer.includes("Wall"))
        stepWallLength += formatToFeet(i?.Length, false);
    });
    dataValues[char].map((i) => {
      if (i?.Layer.includes("Step") && i?.Length === "0'-6\"") is6 = true;
      if (i?.Layer.includes("Step") && i?.Length === "0'-3\"") is3 = true;
    });
    dataValues[char].map((i) => {
      if (
        i?.Layer.includes("Step") &&
        i?.Length !== "0'-6\"" &&
        i?.Length !== "0'-3\""
      ) {
        stepCft +=
          formatToFeet(i?.Length, false) *
          (is3 ? 0.25 : is6 ? 0.5 : 0) *
          stepWallLength;
      }
    });
    dataValues[char].map((i) => {
      if (i?.Layer.includes("P.c.c")) {
        pccCft += formatToFeet(i?.Length, false) * 0.5 * stepWallLength;
      }
    });
    dataValues[char].map((i) => {
      if (i?.Layer.includes("Height")) {
        foundationWallCft +=
          formatToFeet(i?.Length, false) * 0.75 * stepWallLength;
      }
    });
    is3 = false;
    is6 = false;

    console.log(stepCft, "Step", char);
    console.log(pccCft, "PCC", char);
    console.log(foundationWallCft, "Height", char);
    console.log("--------------------------");

    totalStepCft += stepCft;
    totalPccCft += pccCft;
    totalWallCft += foundationWallCft;

    console.log(totalStepCft, " step height");
    console.log(totalPccCft, "total pcc");
    console.log(totalWallCft, "totalWallCft");
    console.log("*********************");
  });
  const finalCft = totalStepCft + totalWallCft;
  const foundationDryQuantity = dryMaterial(finalCft);
  const bricks = calculateBricks(finalCft);
  const sand = calculateSandCft3(1, 4, 5, foundationDryQuantity);
  const cement = calculateCementBags3(1, 4, 5, foundationDryQuantity);
  const bajar = calculateBajarCft3(1, 4, 5, foundationDryQuantity);
  return {
    bricks,
    sand,
    cement,
    bajar,
  };
};
// Replace data[] with data in below line
const getTotal = (data, title) => {
  return Math.floor(data.filter((i) => i?.Layer.includes(title)).length / 2);
};

const doorWindowCFT = (data, thickness) => {
  let cft = 0;
  for (let i = 0; i < data.length; i += 2) {
    cft +=
      formatToFeet(data[i].Value, false) *
      formatToFeet(data[i + 1].Value, false) *
      thickness;
  }
  return cft;
};

const wallReader = (data) => {
  const wall9Data = [];
  const wall4Data = [];
  const wallHeight = [];
  let wallFinalHeight = 0;
  data.forEach((i) => {
    if (i.Layer === "wall9") {
      wall9Data.push(i);
    } else if (i.Layer === "wall4") {
      wall4Data.push(i);
    } else if (i.Layer === "WallHeight") {
      wallHeight.push(i);
      wallHeight.forEach((j) => {
        wallFinalHeight = formatToFeet(j?.Length, false);
      });
    }
  });

  const wall4cft = wallCFT(wall4Data, wallFinalHeight, 0.38);
  const wall9cft = wallCFT(wall9Data, wallFinalHeight, 0.75);

  const total9doors = getTotal(data, "9D");
  const total4doors = getTotal(data, "4D");
  const total9Window = getTotal(data, "9W");
  const total4Window = getTotal(data, "4W");

  let door9Cft = 0;
  let door4Cft = 0;
  let window9Cft = 0;
  let window4Cft = 0;

  for (let i = 0; i < total4doors + total9doors; i++) {
    const doorData = data.filter((item) => {
      if (i < total9doors) {
        return item.Layer === `9D${i + 1}`;
      } else {
        return item.Layer === `4D${i + 1}`;
      }
    });

    if (i < total9doors) {
      door9Cft += doorWindowCFT(doorData, 0.75);
    } else {
      door4Cft += doorWindowCFT(doorData, 0.38);
    }
  }

  for (let i = 0; i < total4Window + total9Window; i++) {
    const windowData = data.filter((item) => {
      if (i < total9Window) {
        return item.Layer === `9W${i + 1}`;
      } else {
        return item.Layer === `4W${i + 1}`;
      }
    });

    if (i < total9Window) {
      window9Cft += doorWindowCFT(windowData, 0.75);
    } else {
      window4Cft += doorWindowCFT(windowData, 0.38);
    }
  }

  const finalCft =
    wall9cft - (door9Cft + window9Cft) + (wall4cft - (door4Cft + window4Cft));

  const dryQuantity = dryMaterial(finalCft);
  const bricks = calculateBricks(finalCft);
  const sand = calculateSandCft(4, 1, dryQuantity);
  const cement = calculateCementBags(4, 1, dryQuantity);
  console.log(finalCft, "final cft");
  return {
    bricks,
    sand,
    cement,
  };
};

//SLAB STEEL READER
const sooterSplit = (val) => {
  return parseInt(val.split("@")[0].split("#")[1]);
};
const getUnitOfDiameter = (val) => {
  const diameter = sooterSplit(val);
  return (diameter * diameter) / 24 / 2.204;
};

// bars calculuation

const barsCalculation = (
  height,
  cut_length,
  spacing_width,
  cover,
  bend,
  // steelSize,
  spacing
) => {
  const total_No_Of_Bars = 0;
  const Unit_Weight = 0.302;
  const footing_Cft = height * cut_length * spacing_width;
  const no_Of_Bars = spacing_width / spacing + 1;
  const cut_Length_Bars = cut_length - cover + bend;
  const total_Cut_Length_Bars = no_Of_Bars * cut_Length_Bars;
  return parseFloat((total_Cut_Length_Bars * Unit_Weight).toFixed(2));
};

// beam calculation
const beamCalculation = (
  length,
  bars,
  cover,
  bend
) => {
  const cut_Length = length - cover + bend;
  const total_length_bars = cut_Length * bars;
  const unit_Weight_Bar = 0.68;
  const total_Weight = total_length_bars * unit_Weight_Bar;
  return parseFloat(total_Weight.toFixed(4));
};

// column calculation

const columnCalculation = (
  cut_height,
  width,
  thickness,
  bars,
  cover,
  bend,
  lapLength,
  steelSize
) => {
  const column_Unit_Weight = 0.68;

  const column_CFT = cut_height * width * thickness;
  const column_Cut_Length = cut_height - cover + bend + lapLength;
  const column_Total_Length = column_Cut_Length * bars;
  return parseFloat((column_Total_Length * column_Unit_Weight).toFixed(2));
};

// ring calculuation
const ringCalculation = (
  cut_height,
  cut_thickness,
  spacing_length,
  cover,
  bend,
  // steelSize,
  spacing
) => {
  const ring_Unit_Weight = 0.17;
  const no_Of_Rings = spacing_length / spacing + 1;
  const ring_Cut_Length =
    (cut_height - cover + bend) * 2 + (cut_thickness - cover) * 2;
  const ring_Total_Cut_Length = ring_Cut_Length * no_Of_Rings;
  const ring_Total_Weight = ring_Total_Cut_Length * ring_Unit_Weight;
  return ring_Total_Weight;
};

const slabSteelReader = () => {
  const convertSpacingToFeet = (val) => {
    return val.split("@")[1].split('"')[0];
  };

  const sooterSplit = (val) => {
    return parseInt(val.split("@")[0].split("#")[1]);
  };
  const getUnitOfDiameter = (val) => {
    const diameter = sooterSplit(val);
    return (diameter * diameter) / 24 / 2.204;
  };

  const filterMyData = (data, start, end) => {
    if (
      data.Layer.split("")[0] === start &&
      data.Layer.split("")[data.Layer.split("").length - 1] === end
    ) {
      return true;
    }
    return false;
  };

  for (
    j = 1;
    j <= data.filter((i) => filterMyData(i, "S", "M")).length / 2;
    j++
  ) {
    const steelBars = [];
    data.map((i) => {
      if (i.Layer === `S${j}D` || i.Layer === `S${j}M`) {
        steelBars.push(i);
      }
    });

    // console.log(steelBars, "STEEL BARS");
    const steelObj = {};
    steelBars.map((i) => {
      if (i?.Length) {
        steelObj[i?.Layer] = {
          ...steelObj[i?.Layer],
          Length: formatToFeet(i?.Length),
        };
      } else {
        steelObj[i?.Layer] = { ...steelObj[i?.Layer], Value: i?.Value };
      }
    });
    console.log(steelObj, "filter");

    // {{distribution bars
    const cutLengthDistribution = steelObj[`S${j}D`]?.Length - 0.0625;
    const barsDistribution =
      (steelObj[`S${j}M`]?.Length - 0.75) /
        (convertSpacingToFeet(steelObj[`S${j}D`]?.Value) / 12) +
      1;

    const totalDistribution =
      cutLengthDistribution *
      barsDistribution *
      getUnitOfDiameter(steelObj[`S${j}D`]?.Value);

    const cutLengthMain = steelObj[`S${j}M`]?.Length - 0.0625;
    const barsMain =
      (steelObj[`S${j}D`]?.Length - 0.75) /
      (convertSpacingToFeet(steelObj[`S${j}M`]?.Value) / 12);

    const totalMain =
      cutLengthMain * barsMain * getUnitOfDiameter(steelObj[`S${j}M`]?.Value);

    console.log(totalDistribution, totalMain, `S${j}`);
  }

  // cut length = s1d.Length * 0.0625;
  // No. of bars =  (s1m.lehgtn * 0.75)/s1d.space;}

  // {main bars

  // cut length = s1m.lehgtn * 0.0625;
  // No. of bars =  (s1d.length * 0.75)/s1m[@];}
  // }
};

//-------------- beam calculation -------------------

const simpleBeamCalculation = () => {
  const beam_Cft = height * length * width;
  const total_Weight_Of_top = beamCalculation(
    height,
    length,
    width,
    top_bars,
    top_steelSize,
    cover,
    bend
  );

  const total_Weight_Of_bottom = beamCalculation(
    height,
    length,
    width,
    bottom_bars,
    bottom_steelSize,
    cover,
    bend
  );

  // Ring

  const total_Weight_Of_ring = ringCalculation(
    height,
    width,
    length,
    0.25,
    0.125,
    ringSteelSize,
    spacing
  );
};

const footingCalculation = () => {
  const unit_Weight_Main_Bar = barsCalculation(
    height,
    length,
    width,
    0.25,
    0.33,
    steelSize,
    spacing
  );
  // Distribution Bar
  const unit_Weight_Dist_Bar = barsCalculation(
    height,
    width,
    length,
    0.25,
    0.33,
    steelSize,
    spacing
  );
};

const inputColumnCalculation = () => {
  const column_CFT = height * width * thickness;
  const column_Total_Weight = columnCalculation(
    height,
    width,
    thickness,
    bars,
    0.25,
    1.5,
    lapLength,
    steelSize
  );

  const total_Weight_Of_ring = ringCalculation(
    width,
    thickness,
    height,
    0.25,
    0.125,
    steelSize,
    spacing
  );
};

// Basement
const basementWall = () => {
  const wallCft = height * Length * thickness;
  // y axies bars
  const weight_y = barsCalculation(
    thickness,
    height,
    length,
    0.25,
    4,
    steelSize,
    spacing
  );
  const total_weight_y = weight_y * 2;
  // x axies bars
  const weight_x = barsCalculation(
    thickness,
    length,
    height,
    0.25,
    4,
    steelSize,
    spacing
  );
  const total_weight_x = weight_x * 2;
};

const basementFooting = () => {
  const main_Unit_Weight = getUnitOfDiameter(steelSize);
  const footing_Cft = height * length * width;
  // main bars
  const unit_Weight_Main_Bar = barsCalculation(
    height,
    length,
    width,
    0.25,
    0.33,
    steelSize,
    spacing
  );
  // Distribution Bar
  const unit_Weight_Dist_Bar = barsCalculation(
    height,
    width,
    length,
    0.25,
    0.33,
    steelSize,
    spacing
  );
  // Top
  const unit_Weight_Top_Main_Bar = barsCalculation(
    height,
    length,
    width,
    0.5,
    0.33,
    steelSize,
    spacing
  );
  // Distribution Bar
  const unit_Weight_Top_Dist_Bar = barsCalculation(
    height,
    width,
    length,
    0.5,
    0.33,
    steelSize,
    spacing
  );
};

const basementBottomSlab = () => {
  const slabCft = length * width * thickness;

  const total_main_weight = barsCalculation(
    height,
    length,
    width,
    0.25,
    0.5,
    steelSize,
    spacing
  );

  const total_dist_weight = barsCalculation(
    height,
    width,
    length,
    0.25,
    0.5,
    steelSize,
    spacing
  );
};

module.exports = {
  wallReader,
  foundationReader,
  basementBottomSlab,
  basementFooting,
  inputColumnCalculation,
  beamCalculation,
  footingCalculation,
  barsCalculation,
  ringCalculation,
  columnCalculation,
};

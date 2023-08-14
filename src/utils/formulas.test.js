const { beamCalculation, barsCalculation, columnCalculation, ringCalculation } = require("./formulas");
describe("Bars Calculation ", ()=>{
    test("Calculate BArs  ", ()=>{
        expect(barsCalculation(1, 8, 7, 0.5 , 1, 0.5)).toBe(38.50);
    })
})


describe("Rings Calculation ", ()=>{
    test("Calculate Rings  ", ()=>{
        expect(ringCalculation(1.03, 0.75, 10, 0.25, 0.125, 0.5)).toBe(10.0317);
    })
})

describe("Column Calculation ", ()=>{
    test("Calculate Column  ", ()=>{
        expect(columnCalculation(3, 1.58, 0.75, 12, 0.25, 1, 3.25, 6)).toBe(57.12)
    })
})

describe("Beam Calculation", () => {
  test("Calculate Beam ", () => {
    expect(beamCalculation(10,4,0.25,0.72)).toBe(28.4784);
  });
});

const Customer = require('./customer.model');
const Login = require('./login.model');
const User = require('./user.model');
const Beam = require('./beam.model');
const LintelBeam = require('./lintel_beams.model');
const ConcileBeam = require('./concile_beam.model');
const BasementWall = require('./basement_wall.model');
const Column = require('./column.model');
const Footing = require('./footing.model');
const RibBeam = require('./rib_beam.controller');
const StairColumn = require('./stair_column.model');
const StairSlab = require('./stair_slab.model');
const ExtendedBars = require('./extended_bars.model');
const WaterTankWall = require('./water_tank_wall.model');

module.exports={
    Customer,
    Login,
    User,
    Beam,
    LintelBeam,
    ConcileBeam,
    BasementWall,
    Column,
    Footing,
    RibBeam,
    StairColumn,
    StairSlab,
    ExtendedBars,
    WaterTankWall,
}
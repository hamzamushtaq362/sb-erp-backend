const router = require("express").Router();
const controller = require("../handlers");
const middleware = require("../middleware");

router.post("/signup", controller.signup);
router.post("/login", controller.login);

router.get(
  "/say",
  middleware.auth,
  middleware.checkPermissions.check([["admin"], ['employee']]),
  // middleware.checkPermissions(['admin', 'employee']),
  controller.sayHello
);
router.get("/user", middleware.auth, controller.getUsers);
router.get("/user/:userId", middleware.auth, controller.user);
router.put("/user/:userId", middleware.auth, controller.updateUser);
router.delete("/user/:userId", middleware.auth, controller.deleteUser);

router.get(
  "/customers",
  middleware.auth,
  middleware.checkPermissions.check("admin"),
  // middleware.checkPermissions(['admin']),
  controller.getCustomers
);
router.get("/customers/:id", middleware.auth, controller.getCustomer);
router.post("/customers", middleware.auth, controller.createCustomers);
router.put("/customers/:id", middleware.auth, controller.updateCustomers);
router.delete("/customers/:id", middleware.auth, controller.deleteCustomers);

router.post(
  "/customer/upload",
  middleware.upload.single("uploaded_file"),
  controller.usersExcel
);

router.post("/customers/fileData", middleware.auth, controller.fileData);
router.post("/customers/beam", middleware.auth, controller.createBeams);
router.post("/customers/lintel_beam", middleware.auth, controller.createLental);
router.post("/customers/concile_beam", middleware.auth, controller.createConcile);
router.post("/customers/basement_wall", middleware.auth, controller.createBasementWall);
router.post("/customers/column", middleware.auth, controller.createColumn);
router.post("/customers/footing", middleware.auth, controller.createFooting);
router.post("/customers/rib_beam", middleware.auth, controller.createRibBeam);
router.post("/customers/stair_column", middleware.auth, controller.createStairColumn);
router.post("/customers/stair_slab", middleware.auth, controller.createStairSlab);
router.post("/customers/extended_bars", middleware.auth, controller.createExtendedBars);
router.post("/customers/water_tank_wall", middleware.auth, controller.createWaterTankWall);

module.exports = router;

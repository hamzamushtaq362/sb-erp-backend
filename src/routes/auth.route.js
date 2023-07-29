const router = require("express").Router();
const controller = require("../controller");
const middleware = require("../middleware");

router.post("/signup", controller.signup);
router.post("/login", controller.login);

router.get(
  "/say",
  middleware.auth,
  middleware.checkPermissions.check("admin"),
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

module.exports = router;

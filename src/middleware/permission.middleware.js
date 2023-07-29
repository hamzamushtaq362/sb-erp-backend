const expressJwtPermissions = require("express-jwt-permissions");

const checkPermissions = expressJwtPermissions({
  permissionsProperty: "roles", //jwt payload
  requestProperty: "user", //req.user
  customCheck: (req, permission) => {
    if (req.user && req.user.roles && req.user.roles.includes(permission)) {
      return true;
    }
    // return false;
    throw new Error('Forbidden')
  },
});

module.exports = {
  checkPermissions,
};

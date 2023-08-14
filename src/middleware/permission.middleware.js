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

// const checkPermissions = (requiredRoles) => {
//   return (req, res, next) => {
//     const userRoles = req.user.roles;

//     const hasRequiredRole = requiredRoles.some((requiredRole) => userRoles.includes(requiredRole));

//     if (!hasRequiredRole) {
//       return res.status(403).json({ error: 'Access forbidden. You need admin or employee role.' });
//     }

//     next();
//   };
// };

module.exports = {
  checkPermissions,
};

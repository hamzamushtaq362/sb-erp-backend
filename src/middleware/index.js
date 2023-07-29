const { auth } = require("./auth.middleware");
const {checkPermissions} = require('./permission.middleware');
const {upload}=require('./upload.middleware');

module.exports = {
  auth,
  checkPermissions,
  upload,
};

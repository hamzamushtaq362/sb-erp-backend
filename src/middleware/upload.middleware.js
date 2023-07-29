const multer  = require('multer')
const path = require('path');
// (../../uploads) (../uploads)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.round(Math.random() * 10)
      let extArray = file.originalname.split(".");
      let fileName=extArray[0];
      let extension = extArray[extArray.length - 1];
      cb(null, fileName + '-' + uniqueSuffix + '.' + extension)
    }
  })

const upload = multer({ storage: storage });
module.exports = {
  upload
};
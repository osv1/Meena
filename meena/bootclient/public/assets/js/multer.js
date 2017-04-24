var multer  = require('multer');
var upload = multer({ storage: storage });
var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})
module.exports = upload;
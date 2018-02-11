var express = require('express');
var router = express.Router();
const multer = require('multer');
let storage = multer.memoryStorage();
let upload = multer({ storage: storage });
let fileUpload = upload.single('face');

/* GET users listing. */
router.post('/',fileUpload , function(req, res, next) {
  const fileContent = req.file.buffer.toString('base64');
  console.log(fileContent);

	res.status(200).send(fileContent);
});

module.exports = router;

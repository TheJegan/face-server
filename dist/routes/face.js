'use strict';
const express = require('express');
const wrap = require('../middleware/promiseWrap');
let router = express.Router();
const multer = require('multer');
let storage = multer.memoryStorage();
let upload = multer({ storage: storage });
let fileUpload = upload.single('face');
router.post('/', fileUpload, wrap(function* (request, response, next) {
    console.log('face recognition');
    const fileContent = request.file.buffer.toString('base64');
    console.log(fileContent);
    response.status(200).send(fileContent);
}));
module.exports = router;
//# sourceMappingURL=face.js.map
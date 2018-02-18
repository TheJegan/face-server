'use strict';
const express = require('express');
const wrap = require('../middleware/promiseWrap');
let router = express.Router();
const multer = require('multer');
let storage = multer.memoryStorage();
let upload = multer({ storage: storage });
let fileUpload = upload.single('face');
const faceService_1 = require('../business/faceService');
let imgService = new faceService_1.ImageService();
router.post('/', fileUpload, wrap(function* (request, response, next) {
    console.info('face-service start');
    const fileContent = request.file.buffer;
    imgService.detectFace(fileContent).then(img => {
        console.info('face-service success');
        response.status(200).send(img);
    }, err => {
        console.error('face-service error');
        response.status(500).send(err);
    });
}));
module.exports = router;
//# sourceMappingURL=face.js.map
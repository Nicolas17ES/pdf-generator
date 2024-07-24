const express = require('express');
const { generatePdfFromImage } = require('../controllers/generatePDFController.js');

module.exports = (upload) => {
    const router = express.Router();

    router.post('/generate', upload.single('image'), generatePdfFromImage);

    return router;
};
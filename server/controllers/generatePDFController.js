const asyncHandler = require('express-async-handler');
const FormData = require('form-data');
const axios = require('axios');

const generatePdfFromImage = asyncHandler(async (req, res) => {
    const { buffer, originalname, mimetype } = req.file;
    console.log(req.file);
    console.log(mimetype);

    if (!req.file) {
        return res.status(400).json({ error: 'Image file is required.' });
    }

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(mimetype)) {
        return res.status(400).json({ error: 'Only JPEG and PNG images are valid.' });
    }

    const formData = new FormData();
    formData.append('image', buffer, { filename: originalname, contentType: mimetype });

    try {
        const response = await axios.post('http://localhost:8000/php-service.php', formData, {
            headers: formData.getHeaders(),
            responseType: 'arraybuffer',
        });

        if (response.status === 200) {
            res.set('Content-Type', 'application/pdf');
            res.send(response.data);
        } else {
            throw new Error('Failed to generate PDF');
        }

    } catch (error) {
        console.error('Error calling PHP service:', error);
        if (error.response) {
            // Server responded with a status other than 2xx
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            // No response was received from the server
            res.status(500).json({ error: 'No response received from the PHP service.' });
        } else {
            // Other errors
            res.status(500).json({ error: 'An error occurred: ' + error.message });
        }
    }
});

module.exports = {
    generatePdfFromImage,
};


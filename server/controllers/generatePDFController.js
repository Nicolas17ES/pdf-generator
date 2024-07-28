const asyncHandler = require('express-async-handler');
const FormData = require('form-data');
const axios = require('axios');

const generatePdfFromImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Image file is required.' });
    }

    const { buffer, originalname, mimetype } = req.file;
    if (!['image/png'].includes(mimetype)) {
        return res.status(400).json({ error: 'Only JPEG and PNG images are valid.' });
    }

    const formData = new FormData();
    formData.append('image', buffer, { filename: originalname, contentType: mimetype });


    try {
        const response = await axios.post('http://localhost:8000/php-service.php', formData, {
            headers: formData.getHeaders(),
            responseType: 'arraybuffer',
        });
        console.log("status", response.status)

        if (response.status === 200) {
            res.set('Content-Type', 'application/pdf');
            res.send(response.data);
        } else {
            return res.status(500).json({ error: 'Failed to generate PDF' });
        }

    } catch (error) {
        console.error('Error calling PHP service:', {
            message: error.message,
            stack: error.stack,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data
            } : undefined,
            request: error.request ? {
                data: error.request.data,
                headers: error.request.headers
            } : undefined
        });

        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response received from the PHP service.' });
        } else {
            res.status(500).json({ error: 'An error occurred: ' + error.message });
        }
    }
});

module.exports = {
    generatePdfFromImage,
};


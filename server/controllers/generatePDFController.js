const asyncHandler = require('express-async-handler');
const FormData = require('form-data');
const axios = require('axios');


const generatePdfFromImage = asyncHandler(async (req, res) => {

    const { message } = req.body;
    const { buffer, originalname, mimetype } = req.file;

    if (!message || !req.file) {
        return res.status(400).json({ error: 'Message and image are required.' });
    }

    if (typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(mimetype)) {
        return res.status(400).json({ error: 'Only JPEG and PNG images are valid.' });
    }

    const formData = new FormData();
    formData.append('message', message);
    formData.append('image', buffer, { filename: originalname, contentType: mimetype });

    try {

        const response = await axios.post('http://localhost:8000/php-service.php', formData, {
            headers: formData.getHeaders(),
            responseType: 'arraybuffer',
        });

        if (response.status !== 200) {
            throw new Error('Failed to generate PDF');
        }

        res.set('Content-Type', 'application/pdf');

        res.send(response.data);

    } catch (error) {

        console.error('Error calling PHP service:', error);
        
        res.status(500).json({ error: 'Cant generate PDF. Server error' });

    }

});

module.exports = {

    generatePdfFromImage,
    
}
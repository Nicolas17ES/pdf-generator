const asyncHandler = require('express-async-handler');
const FormData = require('form-data');
const axios = require('axios');


const generatePdfFromImage = async (req, res) => {

    const { message } = req.body;
    const { buffer, originalname, mimetype } = req.file;

    if (!message || !req.file) {
        return res.status(400).json({ error: 'Message and image are missing.' });
    }

    const formData = new FormData();
    formData.append('message', message);
    formData.append('image', buffer, { filename: originalname, contentType: mimetype });

    try {
        const response = await axios.post('http://localhost:8000/php-service.php', formData, {
            headers: formData.getHeaders(),
            responseType: 'arraybuffer',
        });
        res.set('Content-Type', 'application/pdf');
        console.log(response.data)
        res.send(response.data);
    } catch (error) {
        console.error('Error calling PHP service:', error);
        res.status(500).send('Server error');
    }


};

module.exports = {

    generatePdfFromImage,
    
}
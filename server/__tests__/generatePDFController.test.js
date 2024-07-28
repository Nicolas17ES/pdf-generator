const { generatePdfFromImage } = require('../controllers/generatePDFController');
const axios = require('axios');
const FormData = require('form-data');
const { Request, Response } = require('express');
const multer = require('multer');
const express = require('express');
const request = require('supertest');
const generatePDFRoutes = require('../routes/generatePDFRoutes');

// Mock dependencies
jest.mock('axios');
jest.mock('form-data', () => {
    const FormDataMock = jest.fn(() => ({
        append: jest.fn(),
        getHeaders: jest.fn().mockReturnValue({ 'Content-Type': 'multipart/form-data' }),
    }));
    return FormDataMock;
});

describe('generatePdfFromImage', () => {
    it('should return 400 if no file is provided', async () => {
        const req = { file: null };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await generatePdfFromImage(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Image file is required.' });
    });

    it('should call axios.post with correct parameters and return PDF data', async () => {
        const req = {
            file: {
                buffer: Buffer.from('image data'),
                originalname: 'image.png',
                mimetype: 'image/png'
            }
        };

        const res = {
            set: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const mockPDFData = Buffer.from('fakepdf');
        axios.post.mockResolvedValue({ status: 200, data: mockPDFData });

        await generatePdfFromImage(req, res);

        expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/php-service.php', expect.any(FormData), {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'arraybuffer'
        });

        expect(res.set).toHaveBeenCalledWith('Content-Type', 'application/pdf');
        expect(res.send).toHaveBeenCalledWith(mockPDFData);
    });

    it('should handle errors from the controller', async () => {
        const req = {
            file: {
                buffer: Buffer.from('image data'),
                originalname: 'image.png',
                mimetype: 'image/png'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        axios.post.mockRejectedValue({ response: { status: 500, data: 'Server Error' } });

        await generatePdfFromImage(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Server Error' });
    });
});


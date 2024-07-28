const request = require('supertest');
const express = require('express');
const multer = require('multer');
const generatePDFRoutes = require('../routes/generatePDFRoutes');
const axios = require('axios');
const FormData = require('form-data');

jest.mock('axios');
jest.mock('form-data', () => {
    const FormDataMock = jest.fn(() => ({
        append: jest.fn(),
        getHeaders: jest.fn().mockReturnValue({ 'Content-Type': 'multipart/form-data' }),
    }));
    return FormDataMock;
});

// Test Routes Directly
describe('POST /pdf/generate', () => {
    let app;
    let upload;

    beforeEach(() => {
        app = express();
        upload = multer(); // Initialize multer middleware
        app.use('/pdf', generatePDFRoutes(upload));
    });

    it('should return 400 if no file is provided', async () => {
        const response = await request(app).post('/pdf/generate');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Image file is required.');
    });

    it('should return 400 for invalid file type', async () => {
        const response = await request(app)
            .post('/pdf/generate')
            .attach('image', Buffer.from('fakeimage'), 'fakeimage.txt');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Only JPEG and PNG images are valid.');
    });

    it('should return PDF data when a valid file is uploaded', async () => {
        const mockPDFData = Buffer.from('fakepdf');
        axios.post.mockResolvedValue({ status: 200, data: mockPDFData });

        const response = await request(app)
            .post('/pdf/generate')
            .attach('image', Buffer.from('image data'), 'image.png');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toBe('application/pdf');
        expect(response.body).toEqual(mockPDFData);
    });

    it('should handle errors from the controller', async () => {
        axios.post.mockRejectedValue({ response: { status: 500, data: 'Server Error' } });

        const response = await request(app)
            .post('/pdf/generate')
            .attach('image', Buffer.from('image data'), 'image.png');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Server Error');
    });
});

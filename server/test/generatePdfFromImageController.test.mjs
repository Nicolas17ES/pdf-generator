import * as chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import FormData from 'form-data';
import { generatePdfFromImage } from '../controllers/generatePDFController.js';
import fs from 'fs';
import path from 'path';


// Define the path to your image file
const imagePath = path.join('test', 'test.png');

// Read the image file as a buffer
const imageBuffer = fs.readFileSync(imagePath);


chai.use(chaiHttp);
const { expect } = chai;

describe('generatePdfFromImage Controller', () => {
    let req, res, axiosInstance;

    beforeEach(() => {
        req = {
            file: {
                buffer: imageBuffer,
                originalname: 'test.png',
                mimetype: 'image/png'
            }
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy(),
            set: sinon.spy(),
            send: sinon.spy()
        };

        axiosInstance = new MockAdapter(axios);
    });

    afterEach(() => {
        axiosInstance.restore();
    });

    it('should return 400 if no file is provided', async () => {
        req.file = null;

        await generatePdfFromImage(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ error: 'Image file is required.' })).to.be.true;
    });

    it('should return 400 if file is not a valid image type', async () => {
        req.file.mimetype = 'image/gif';

        await generatePdfFromImage(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ error: 'Only JPEG and PNG images are valid.' })).to.be.true;
    });

    it('should send PDF file if PHP service responds with 200', async () => {
        // Mock buffer for testing
        const pdfBuffer = Buffer.from('test pdf buffer'); // Adjust this to match the actual expected PDF content

        // Mock the axios POST request
        axiosInstance.onPost('http://localhost:8000/php-service.php').reply(200, pdfBuffer, {
            'Content-Type': 'application/pdf'
        });

        await generatePdfFromImage(req, res);

        // Check headers
        expect(res.set.calledWith('Content-Type', 'application/pdf')).to.be.true;


        // Check response body
        const actualBuffer = res.send.firstCall.args[0];

        // Ensure the response body is a Buffer
        expect(Buffer.isBuffer(actualBuffer)).to.be.true;

        // Optionally, check the size of the buffer
        expect(actualBuffer.length).to.be.greaterThan(0); 
    });


    it('should handle PHP service error response correctly', async () => {
        req.file.buffer = Buffer.from('test image buffer');
        axiosInstance.onPost('http://localhost:8000/php-service.php').reply(500, { error: 'Failed to generate PDF' });

        await generatePdfFromImage(req, res);

        expect(res.status.calledWith(500)).to.be.true;
    });

});

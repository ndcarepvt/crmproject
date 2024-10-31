import express from 'express';
import { invoiceExtractData } from '../controller/invoice.controller.js';
import multer from 'multer';

const invoiceRouter = express.Router();

// Configure multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public'); // Ensure this folder exists and is writable
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Define the route with multer middleware for file uploads
invoiceRouter.post('/extractData', upload.single('pdf'), invoiceExtractData);

export default invoiceRouter;

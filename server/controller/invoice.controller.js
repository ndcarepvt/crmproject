import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfParse from 'pdf-parse';
import pdf from 'pdf-parse';
import axios from 'axios'

const invoiceExtractData = async (req, res) => {

    const PDF_FILE = req.file.path

    if (!req.file || !req.file.filename) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // parseInvoice(PDF_FILE)
    getBillData()

    try {
        const dataBuffer = fs.readFileSync(PDF_FILE);

        // Parse the PDF using pdf-parse
        const data = await pdf(dataBuffer);

        // Send extracted text as response
        return res.json({ success: true, message: data.text });
    } catch (err) {
        console.error('Error reading or processing file:', err);
        return res.status(500).json({ success: false, message: 'Error processing PDF' });
    }
};


// const getFormattedInvoiceData = async (file) => {
//     const dataBuffer = fs.readFileSync(file);

//     try {
//         const data = await pdfParse(dataBuffer);
//         const text = data.text;

//         // Function to extract key-value pairs
//         const parsedData = parseInvoiceText(text);
//         console.log(parsedData);

//     } catch (error) {
//         console.error("Error parsing PDF:", error);
//     }
// };

// function parseInvoiceText(text) {
//     const data = {};

//     data.sNo = text.match(/S.No\s*:\s*(\d+)/g)?.map(item => item.replace(/S.No\s*:\s*/, '')) || [];
//     data.particulars = text.match(/PARTICULARS\s*(.*?)\s*\d/g)?.[1] || [];
//     data.hsnCode = text.match(/HSN CODE\s*(\d+)/)?.[1] || '';
//     data.batch = text.match(/BATCH\s*(\d+)/)?.[1] || '';
//     data.qty = text.match(/QTY\s*(\d+)/)?.[1] || '';
//     data.price = text.match(/PRICE\s*([\d.]+)/g)?.map(item => item.replace(/PRICE\s*/, '')) || [];
//     data.totalInr = text.match(/TOTAL\s*\(INR\)\s*([\d.]+)/g)?.map(item => item.replace(/TOTAL\s*\(INR\)\s*/, '')) || [];
//     data.totalAmount = text.match(/TOTAL\s*([\d.]+)/)?.[1] || '';
//     data.consignorManufacturer = text.match(/Consignor\/Manufacturer\s*(.*)/)?.[1] || '';
//     data.invoiceNumber = text.match(/Invoice No\.\s*(\S+)/)?.[1] || '';
//     data.invoiceDate = text.match(/Invoice Date\s*(\S+)/)?.[1] || '';
//     data.lutNumber = text.match(/LUT No\s*(\S+)/)?.[1] || '';
//     data.gstin = text.match(/GST In:\s*([A-Z0-9]+)/)?.[1] || '';
//     data.carriageBy = text.match(/Carriage By:\s*(.*)/)?.[1] || '';
//     data.placeOfReceipt = text.match(/Place Of Receipts\s*By\s*Pre\s*(.*)/)?.[1] || '';
//     data.countryOfOrigin = text.match(/Country Of Origin\s*(.*)/)?.[1] || '';
//     data.countryOfFinalDestination = text.match(/Country Of Final Destination\s*(.*)/)?.[1] || '';
//     data.flightNumber = text.match(/Flight No.\s*(.*)/)?.[1] || '';
//     data.portOfLoading = text.match(/Port Of Loading:\s*(.*)/)?.[1] || '';
//     data.termsOfDeliveryAndPayment = text.match(/Terms Of Delivery And Payment:\s*(.*)/)?.[1] || '';
//     data.portOfDischarge = text.match(/Port Of Discharge:\s*(.*)/)?.[1] || '';
//     data.finalDestination = text.match(/Final Destination:\s*(.*)/)?.[1] || '';
//     data.freightToPay = text.match(/Freight:\s*(.*)/)?.[1] || '';
//     data.payment = text.match(/PAYMENT:\s*(\w+)/)?.[1] || '';
//     data.amountInWords = text.match(/In Words:\s*(.*)/)?.[1] || '';
//     data.additionalDiscount = text.match(/Additional Discount\s*([\d.]+)/)?.[1] || '';
//     data.grandTotal = text.match(/Grand Total\s*([\d.]+)/)?.[1] || '';
//     data.invoiceType = text.match(/EXPORT TAX INVOICE/) ? 'EXPORT TAX INVOICE' : '';

//     console.log(data)
// }

// async function parseInvoice(pdfPath) {
//     try {
//       const dataBuffer = fs.readFileSync(pdfPath);
//       const pdfData = await pdfParse(dataBuffer);

//       const text = pdfData.text;
//       console.log(pdfData);

//       console.log("Extracted Text:\n", text); // Log to verify structure

//       // Adjusted regex patterns based on the compact format
//       const invoiceNumberPattern = /Invoice No\.\s*(\d+)/i;
//       const invoiceDatePattern = /Invoice Date\s*(\d{2}-\d{2}-\d{4})/i;
//       const iecNumberPattern = /IEC Number\s*(\d+)/i;
//       const gstPattern = /GST In:\s*([\w\d]+)/i;
//       const lutNumberPattern = /LUT No\s*([A-Za-z0-9]+)/i;
//       const itemPattern = /(\d+)\s*([A-Za-z\s()]+)\s*(\d+)\s*(\d+)\s*(\d+\.\d{2})/g;
//       const totalAmountPattern = /Amount\s*(\d+\.\d{2})/i;
//       const discountPattern = /Additional Discount\s*(\d+\.\d{2})/i;
//       const grandTotalPattern = /Grand Total\s*(\d+\.\d{2})/i;

//       // Extract invoice number
//       const invoiceNumberMatch = text.match(invoiceNumberPattern);
//       const invoiceNumber = invoiceNumberMatch ? invoiceNumberMatch[1] : 'N/A';

//       // Extract invoice date
//       const invoiceDateMatch = text.match(invoiceDatePattern);
//       const invoiceDate = invoiceDateMatch ? invoiceDateMatch[1] : 'N/A';

//       // Extract IEC number
//       const iecMatch = text.match(iecNumberPattern);
//       const iecNumber = iecMatch ? iecMatch[1] : 'N/A';

//       // Extract GST and LUT numbers
//       const gstMatch = text.match(gstPattern);
//       const gstIn = gstMatch ? gstMatch[1] : 'N/A';

//       const lutMatch = text.match(lutNumberPattern);
//       const lutNumber = lutMatch ? lutMatch[1] : 'N/A';

//       // Extract each line item
//       const items = [];
//       let match;
//       while ((match = itemPattern.exec(text)) !== null) {
//         items.push({
//           serialNumber: match[1],
//           particulars: match[2].trim(),
//           hsnCode: match[3],
//           quantity: parseInt(match[4], 10),
//           total: parseFloat(match[5].replace(',', ''))
//         });
//       }

//       // Extract additional amounts
//       const totalAmountMatch = text.match(totalAmountPattern);
//       const totalAmount = totalAmountMatch ? totalAmountMatch[1] : 'N/A';

//       const discountMatch = text.match(discountPattern);
//       const discount = discountMatch ? discountMatch[1] : 'N/A';

//       const grandTotalMatch = text.match(grandTotalPattern);
//       const grandTotal = grandTotalMatch ? grandTotalMatch[1] : 'N/A';

//       // Return parsed data in structured format
//      console.log( invoiceNumber,
//         invoiceDate,
//         iecNumber,
//         gstIn,
//         lutNumber,
//         items,
//         totalAmount,
//         discount,
//         grandTotal)
//     } catch (error) {
//       console.error("Error parsing the PDF:", error);
//     }
//   }


const getBillData = () => {
    const url = `https://ndayurveda.info/api/invoice/byid?billid=197518`;

    axios.get(url)
        .then(response => {
            console.log('Invoice Data:', response.data);
        })
        .catch(error => {
            console.error('Error fetching invoice:', error);
        });
}


export { invoiceExtractData }


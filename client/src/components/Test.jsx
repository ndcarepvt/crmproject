// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontSize: 10,
//   },
//   section: {
//     marginBottom: 10,
//   },
//   header: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   table: {
//     display: 'table',
//     width: 'auto',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderColor: '#000',
//     marginBottom: 20,
//   },
//   tableRow: {
//     flexDirection: 'row',
//   },
//   tableCol: {
//     width: '20%',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderColor: '#000',
//     padding: 5,
//   },
//   tableHeader: {
//     backgroundColor: '#eee',
//     fontWeight: 'bold',
//   },
// });

// const Test = () => (
//     <Document>
//       <Page style={styles.page}>
//         <Text style={styles.header}>EXPORT TAX INVOICE</Text>
        
//         {/* Consignor and Consignee Information */}
//         <View style={styles.section}>
//           <Text>Consignor/Manufacturer: Nirogam</Text>
//           <Text>Invoice No: 197518</Text>
//           <Text>Invoice Date: 21-10-2024</Text>
//           <Text>LUT No: AD030119000043Z</Text>
//           <Text>Consignee: GST In: 03CQEPS7769C1ZM</Text>
//         </View>

//         {/* Table Header */}
//         <View style={styles.table}>
//           <View style={[styles.tableRow, styles.tableHeader]}>
//             <Text style={styles.tableCol}>S.No.</Text>
//             <Text style={styles.tableCol}>PARTICULARS</Text>
//             <Text style={styles.tableCol}>HSN CODE</Text>
//             <Text style={styles.tableCol}>BATCH</Text>
//             <Text style={styles.tableCol}>QTY</Text>
//             <Text style={styles.tableCol}>PRICE</Text>
//             <Text style={styles.tableCol}>TOTAL (INR)</Text>
//           </View>

//           {/* Table Row - Product 1 */}
//           <View style={styles.tableRow}>
//             <Text style={styles.tableCol}>1</Text>
//             <Text style={styles.tableCol}>BRAINO R CONC (USA)</Text>
//             <Text style={styles.tableCol}>30039011</Text>
//             <Text style={styles.tableCol}>7</Text>
//             <Text style={styles.tableCol}>28</Text>
//             <Text style={styles.tableCol}>50</Text>
//             <Text style={styles.tableCol}>1400.00</Text>
//           </View>

//           {/* Table Row - Courier */}
//           <View style={styles.tableRow}>
//             <Text style={styles.tableCol}>2</Text>
//             <Text style={styles.tableCol}>Courier</Text>
//             <Text style={styles.tableCol}></Text>
//             <Text style={styles.tableCol}></Text>
//             <Text style={styles.tableCol}></Text>
//             <Text style={styles.tableCol}></Text>
//             <Text style={styles.tableCol}>60.00</Text>
//           </View>

//           {/* Summary Row */}
//           <View style={styles.tableRow}>
//             <Text style={styles.tableCol}>TOTAL</Text>
//             <Text style={styles.tableCol}></Text>
//             <Text style={styles.tableCol}></Text>
//             <Text style={styles.tableCol}></Text>
//             <Text style={styles.tableCol}>28</Text>
//             <Text style={styles.tableCol}></Text>
//             <Text style={styles.tableCol}>1460.00</Text>
//           </View>
//         </View>

//         {/* Footer Section */}
//         <View style={styles.section}>
//           <Text>Additional Discount: 560.00</Text>
//           <Text>Grand Total: 900.00</Text>
//           <Text>In Words: Nine hundred only</Text>
//           <Text style={{ marginTop: 10 }}>Auth. Signatory: For Nirogam</Text>
//         </View>
//       </Page>
//     </Document>
// );

// export default Test;

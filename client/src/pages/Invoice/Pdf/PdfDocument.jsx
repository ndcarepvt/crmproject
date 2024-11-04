import React, { useContext } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { CRMContext } from '../../../context/crmContext';
// import { CRMContext } from '../../../context/crmContext';

const PdfDocument = (props) => {


  const styleObj = StyleSheet.create({

    // page: {
    //   flexDirection: 'column',
    // },

    headingSection: {
      textAlign: 'center',
      margin: 15,
    },

    heading: {
      fontWeight: 900,
      fontSize: 20,
    },

    invoiceSection: {
      border: 1,
      borderColor: 'black',
      borderStyle: 'solid',
      margin: 20,
      padding: 4,

    },

    invoieTBHead: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 10,
      paddingBottom: 10,
      borderBottom: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: 'black',

    },

    invoiceTBGap: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    },
    invoiceTBGap1: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      width: '20%',
      margin: 'auto'
    },
    invoiceTBGap2: {
      display: 'flex',
      flexDirection: 'column',
      gap: 65
    },
    invoiceTBGap3: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
      paddingVertical: 10,
      borderBottom: 1,
      borderBottomColor: 'black',
      borderBottomStyle: 'solid'
    },
    invoiceTBGap4: {
      display: 'flex',
      flexDirection: 'row',
      gap: 50,
      alignItems: 'center',
      paddingVertical: 10,
    },


    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000',
      marginBottom: 20,
      marginHorizontal: 20,
      fontSize: 12
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCol: {
      width: '20%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000',
      padding: 5,
      fontSize: 11,
      textAlign: 'center'
    },
    tableHeader: {
      fontWeight: 'bold',
      fontSize: 11
    },
    highlightedSection: {
      marginHorizontal: 15,
      fontSize: 11,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    highlightedCol: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000',
      padding: 5,
      fontSize: 11,
      width: "35%",
    },
    highlightTableRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    boldText: {
      fontWeight: 'bold',
    },
    highlightTable: {
      display: 'table',
      width: 'auto',
      fontSize: 12
    },
    tableColWidth: {
      width: '10%'
    },
    tableColWidthBig: {
      width: '30%'
    }

  })

  return (
    <Document>
      <Page size='A4' >
        {console.log(props.currencyRate)}
        <View >
          {/* Heading */}

          <View style={styleObj.headingSection}>
            <Text style={styleObj.heading}>EXPORT TAX INVOICE</Text>
          </View>

          {/* invoice body section */}
          <View style={styleObj.invoiceSection}>
            <View style={styleObj.invoieTBHead}>
              <View style={styleObj.invoiceTBGap}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Consignor/Manufacture</Text>
                <Text style={{ fontSize: 12 }}>{props.formData.company}</Text>
                <Text style={{ fontSize: 12 }}>Green Field, Majitha Road, Amritsar</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 10 }}>GST In : {props.formData.gstNumber}</Text>
              </View>
              <View style={styleObj.invoiceTBGap}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Invoice No.</Text>
                <Text style={{ fontSize: 10 }}>{props.formData.invoiceId}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Invoice Date</Text>
                <Text style={{ fontSize: 10 }}>{props.formData.invoiceDate}</Text>
              </View>
              <View style={styleObj.invoiceTBGap}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>IEC Number</Text>
                <Text style={{ fontSize: 10 }}>{props.formData.iecNumber}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>LUT Number</Text>
                <Text style={{ fontSize: 10 }}>{props.formData.lutNumber}</Text>
              </View>
            </View>
            <View style={styleObj.invoieTBHead}>
              <View style={styleObj.invoiceTBGap}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Consignee: {props.formData.patientName}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Address : {props.formData.patientAddress}</Text>
              </View>
            </View>

            <View style={styleObj.invoieTBHead}>
              <View style={styleObj.invoiceTBGap1}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Carried By:</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Flight No:</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Port of Discharge:</Text>

              </View>
              <View style={styleObj.invoiceTBGap1}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Place Of Receipts By Pre</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Port Of Loading:</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Final Destination:</Text>
              </View>
              <View style={styleObj.invoiceTBGap1}>
                <Text style={{ fontWeight: 'bold', fontSize: '12px' }}>Country of Origin : India </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Terms Of Delivery And Payment : </Text>
                <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Freight : </Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>PAYMENT : </Text>
                </View>
              </View>
              <View style={styleObj.invoiceTBGap2}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Country of Final Destination </Text>
                <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>To Pay : </Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>ADVANCE : </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styleObj.table}>
            <View style={[styleObj.tableRow, styleObj.tableHeader]}>
              <Text style={[styleObj.tableCol, styleObj.tableColWidth]}>S.No.</Text>
              <Text style={[styleObj.tableCol, styleObj.tableColWidthBig, {textAlign:'justify', width:'45%'}]}>PARTICULARS (HERBAL DIETARY SUPLLEMENTS)</Text>
              <Text style={styleObj.tableCol}>HSN CODE</Text>
              <Text style={styleObj.tableCol}>BATCH</Text>
              <Text style={[styleObj.tableCol, styleObj.tableColWidth]}>QTY</Text>
              <Text style={[styleObj.tableCol, styleObj.tableColWidth,]}>PRICE</Text>
              <Text style={[styleObj.tableCol,]}>{`TOTAL (${props.formData.currency})`}</Text>
            </View>

            {props.data ? props.data.map((item, index) => (
              <View key={index}>
                <View style={styleObj.tableRow}>
                  <Text style={[styleObj.tableCol, styleObj.tableColWidth, { fontSize: 10 }]}>{index + 1}</Text>
                  <Text style={[styleObj.tableCol, styleObj.tableColWidthBig, { fontSize: 10, textAlign:'justify', width:'45%' }]}>{item.pbill.productname}</Text>
                  <Text style={[styleObj.tableCol, { fontSize: 10 }]}>{item.product.hsncode}</Text>
                  <Text style={[styleObj.tableCol, { fontSize: 10 }]}>{item.stock.batchno}</Text>
                  <Text style={[styleObj.tableCol, styleObj.tableColWidth, { fontSize: 10 }]}>{item.pbill.qty}</Text>
                  <Text style={[styleObj.tableCol, styleObj.tableColWidth, { fontSize: 10 }]}>{(item.pbill.price * props.currencyRate).toFixed(2)}</Text>
                  <Text style={[styleObj.tableCol, { fontSize: 10 }]}>{(item.pbill.total * props.currencyRate).toFixed(2)}</Text>
                </View>
              </View>
            )) : null}

            {/* Consultation Cost Row */}
            {props.formData.consultationCost > 1 ?
              <View style={styleObj.tableRow}>
                <Text style={[styleObj.tableCol, styleObj.tableColWidth, { fontSize: 10 }]}>{props.data ? props.data.length + 2 : 2}</Text>
                <Text style={[styleObj.tableCol, styleObj.tableColWidthBig, { fontSize: 10, textAlign:'justify', width:'45%' }]}>Consultation Cost</Text>
                <Text style={[styleObj.tableCol, { fontSize: 10 }]}>-</Text>
                <Text style={[styleObj.tableCol, { fontSize: 10 }]}>-</Text>
                <Text style={[styleObj.tableCol, styleObj.tableColWidth, { fontSize: 10 }]}>-</Text>
                <Text style={[styleObj.tableCol, styleObj.tableColWidth, { fontSize: 10 }]}>-</Text>
                <Text style={[styleObj.tableCol, { fontSize: 10 }]}>{props.formData.consultationCost}</Text>
              </View> : <></>}

            {/* Courier Cost Row */}
            <View style={styleObj.tableRow}>
              <Text style={[styleObj.tableCol, styleObj.tableColWidth, { fontSize: 10 }]}>{props.data ? props.data.length + 1 : 1}</Text>
              <Text style={[styleObj.tableCol, styleObj.tableColWidthBig, { fontSize: 10, textAlign:'justify', width:'45%' }]}>Courier Cost</Text>
              <Text style={[styleObj.tableCol, { fontSize: 10 }]}>-</Text>
              <Text style={[styleObj.tableCol, { fontSize: 10 }]}>-</Text>
              <Text style={[styleObj.tableCol, styleObj.tableColWidth, { fontSize: 10 }]}>-</Text>
              <Text style={[styleObj.tableCol, styleObj.tableColWidth, { fontSize: 10 }]}>-</Text>
              <Text style={[styleObj.tableCol,  { fontSize: 10 }]}>{props.formData.courierCost}</Text>
            </View>



            <View style={styleObj.tableRow}>
              <Text style={[styleObj.tableCol, styleObj.tableColWidth]}></Text>
              <Text style={[styleObj.tableCol, styleObj.tableColWidthBig, { fontSize: 10, textAlign:'justify', width:'45%' }]}>Total</Text>
              <Text style={[styleObj.tableCol, { fontSize: 10 }]}>-</Text>
              <Text style={[styleObj.tableCol, { fontSize: 10 }]}>-</Text>
              <Text style={[styleObj.tableCol, styleObj.tableColWidth, { fontSize: 10 }]}>-</Text>
              <Text style={[styleObj.tableCol, styleObj.tableColWidth, { fontSize: 10 }]}></Text>
              <Text style={[styleObj.tableCol,  { fontSize: 10 }]}>{props.formData.totalAmount} </Text>
            </View>
          </View>

          <View style={styleObj.highlightedSection}>
            <View>
            <Text>{`In Words: ${props.formData.numberToWord}`}</Text>
            <Text style={{width:'45%', fontSize:9}}>WE HERE BY CERTIFY THAT INVOICE IS CORRECT AND STRICTLY ACCORDANCE WITH THE PERFORMA INVOICE</Text>
            </View>
            <View style={styleObj.highlightTable}>
              <View style={[styleObj.highlightTableRow, styleObj.tableHeader]}>
                <Text style={styleObj.highlightedCol}>Amount:</Text>
                <Text style={styleObj.highlightedCol}>{props.formData.totalAmount}</Text>
              </View>
              <View style={[styleObj.highlightTableRow, styleObj.tableHeader]}>
                <Text style={styleObj.highlightedCol}>Additional Discount:</Text>
                <Text style={styleObj.highlightedCol}>{props.formData.discount}</Text>
              </View>
              <View style={[styleObj.highlightTableRow, styleObj.tableHeader]}>
                <Text style={styleObj.highlightedCol}>{`Grand Total (${props.formData.currency}) :`}</Text>
                <Text style={styleObj.highlightedCol}>{props.formData.totalAmount - props.formData.discount} </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={{ textAlign: 'right', marginHorizontal: 20, fontSize: 11 }}>
            <Text style={{ margin: 20, fontSize: 14 }}>For Nirogam</Text>
            <Text style={{ margin: 20, }}>Auth. Signatory</Text>

          </View>

        </View>

      </Page>
    </Document>
  )
}

export default PdfDocument
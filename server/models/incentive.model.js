import mongoose from 'mongoose'

const incentiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  userId:{
    type:String,
    required:true
  },
  invoiceId: {
    type: Number,
    required: true
  },
  invoiceCurrency:{
    type:String,
    required:true
  },
  commission: {
    type: Number,
    required: true
  },
  billAmount: {
    type: Number,
    required: true
  },
  receivedAmount: {
    type: Number,
    default:0,
  },
  commissionAmount: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
  InvoiceDate: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const Incentive = mongoose.models.Incentive || mongoose.model('Incentive', incentiveSchema)
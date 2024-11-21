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
  invoiceId: {
    type: Number,
    required: true
  },
  commission: {
    type: Number,
    required: true
  },
  billAmount: {
    type: Number,
    required: true
  },
  recievedAmount: {
    type: Number,
  },
  commissionAmount: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true });

export const Incentive = mongoose.models.Incentive || mongoose.model('Incentive', incentiveSchema)
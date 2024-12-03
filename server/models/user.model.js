import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    pages: {
        type: Array,
        required: true
    },
    commission: {
        type: Number,
    },
    delete: {
        type: String,
        default: false
    }

}, { timeStemps: true })

export const User = mongoose.models.User || mongoose.model('User', userSchema)

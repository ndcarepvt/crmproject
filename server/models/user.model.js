import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    // userId:{
    //     type:Number,
    //     unique:true,
    //     required:true
    // },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
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

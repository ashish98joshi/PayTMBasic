const mongoose = require('mongoose');

require("dotenv").config()
mongoose.connect(process.env.DATABASE_URL);

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxlenght: 30,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxlenght: 16
    },
    firstName: {
        type: String, 
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 
    balance: {
        type: Number, 
        required: true 
    }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);


module.exports = { User, Account }
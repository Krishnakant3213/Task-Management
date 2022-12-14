const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model('User', {
    name: {
        type: String, required: true
    }, age: {
        type: Number, default: 0, validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }, email: {
        type: String, required: true, trim: true, lowercase: true, validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }, password: {
        type: String, required: true, trim: true, minLength: 6, validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

module.exports = User

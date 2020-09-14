const mongoose = require('mongoose')
const validator = require('validator')

//teacher model
const Teacher = mongoose.model('Teacher', {
    firstName: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error('Name is not valid')
            }
        }
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error('Name is not valid')
            }
        }
    },
    password:
    {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
            if (!strongRegex.test(value)) {
                throw new Error('Password must be strong')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email address is not valid')
            }
        }
    },
    dateJoined: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = Teacher
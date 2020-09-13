const mongoose = require('mongoose')
const validator = require('validator')

//teacher model
const Teacher = mongoose.model('Teacher', {
    name: {
        type: String,
        required: true,
        trim: true,
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
        minlength: 8
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
const { model, ObjectId } = require('mongoose')
const validator = require('validator')

const Videos = model('Videos', {
    path: String,
    uploadedBy: ObjectId,
    type: String,
})

module.exports = Videos
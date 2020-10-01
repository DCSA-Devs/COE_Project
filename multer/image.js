const multer = require("multer")

// config for uploading images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profilepics')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const uploadImage = multer({
    storage,
    limits: {
        fileSize: 102400
    },
    fileFilter(res, file, cb) {
        if (file.originalname.match(/\.(jpg|png)$/)) {
            cb(null, true)
        }
        else
            cb(new Error('File format not supported'))
    }
})


module.exports = uploadImage
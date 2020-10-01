const multer = require("multer")

// config for uploading videos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/videos')

    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const uploadVideo = multer({
    storage,
    limits: {
        fileSize: 102400000
    },
    fileFilter(res, file, cb) {
        if (file.originalname.match(/\.(mp4|mkv|avi)$/)) {
            cb(null, true)
        }
        else
            cb(new Error('File format not supported'))
    }
})

module.exports = uploadVideo
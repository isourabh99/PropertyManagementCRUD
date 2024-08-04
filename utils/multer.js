const multer = require('multer')
const {v4:uuid4} = require('uuid')
const path  = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueName = uuid4() + path.extname(file.originalname)
        cb(null, uniqueName)
    }
})

const upload = multer({
    storage: storage
})

module.exports = upload
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => cb(null, `${Math.floor(Math.random() * 10000)}${path.extname(file.originalname)}`)
});
const uploader = new multer({ storage });

exports.uploader = uploader.single('imageUrl');

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profilePictures', // Folder Name on Cloudinary
    allowed_formats: ['jpeg', 'png', 'jpg'],
    public_id: (req, file) => Date.now() + '-' + file.originalname
  }
});

const upload = multer({ storage });

module.exports = upload;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'drno4r3vd', // Replace with your Cloudinary Cloud Name
  api_key: '425676295184745',       // Replace with your Cloudinary API Key
  api_secret: 'DJdSmK5ZRKxAUAb9bLFTNd9YBx0'  // Replace with your Cloudinary API Secret
});

module.exports = cloudinary;

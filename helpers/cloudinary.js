const cloudinary = require("cloudinary").v2;
const fs = require("fs");
let imgUrl;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function cloudinaryUpload(locaFilePath) {
  return cloudinary.uploader
    .upload(locaFilePath, {
      use_filename: true,
      unique_filename: false,
      format: "png",
      upload_preset: "engage",
    })
    .then((result) => {
      fs.unlinkSync(locaFilePath);
      imgUrl = result.url;
      return {
        message: "Success",
        url: result.url,
      };
    })
    .catch((error) => {
      return { message: error.message };
    });
}

module.exports = cloudinaryUpload;

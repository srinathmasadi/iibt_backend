require('dotenv').config()

const config = process.env
var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key:config.API_KEY,
    api_secret: config.API_SECRET
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

const uploadImage = async (image)=>{
    try {
        const response = await cloudinary.uploader.upload(image, opts);
        if (response && response.secure_url) {
            console.log(response.secure_url);
            return {
                status: true,
                message: "Image Upload successfully",
                data: response.secure_url,
            }
        } else {
            return {
                status: false,
                message: "Something went wrong while uploading image",
            }
        }
    } catch (error) {
        return {
            status: false,
            message: "Image uploading failed",
            data:error
        }
    }
}

module.exports = {uploadImage}
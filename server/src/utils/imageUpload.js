


const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const result = await cloudinary.uploader.upload(localFilePath, {
            folder: "event-images",
        });
        fs.unlinkSync(localFilePath); // Remove local temp file
        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

module.exports = uploadToCloudinary;

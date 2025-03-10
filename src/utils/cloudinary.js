import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { configDotenv } from "dotenv";

configDotenv({
    path: './.env'
})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // Upload an image
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: 'auto',
            }
        )
        console.log('file is uploaded on cloudinary', response.url)
        fs.unlinkSync(localFilePath)
        return response

    } catch (err) {
        console.log('failed to upload on cloudinary', err)
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation got failed 
        return null
    }
}
export { uploadOnCloudinary }



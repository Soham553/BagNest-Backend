import { v2 as cloudinary } from "cloudinary";

console.log("inside config:",process.env.Api_secret, " ",  process.env.Api_key)
cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Api_key,
    api_secret: process.env.Api_secret
})

export default cloudinary;
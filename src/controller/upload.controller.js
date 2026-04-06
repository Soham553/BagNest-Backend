import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
import Product from "../models/product.model.js";
import fsPromises from "fs/promises";
import { google } from "googleapis";
import {auth} from "./auth.js" 

const youtube = google.youtube("v3");

export const uploadProduct = async (req, res) => {
  try {
    // if (!req.files?.image) {
    //   return res.status(400).json({ message: "Image is required" });
    // }
  let images;
  
   if(req.files.image){
     const uploadpromises = req.files.image.map(file => 
      cloudinary.uploader.upload(file.path, {
        folder: "products"
      })
    );

    const results = await Promise.all(uploadpromises);

    images = results.map(result => result.secure_url);
   }

  

    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "products",
    // });
    console.log("starting 1");
    let videoId = null;
    const videoFile = req.files.video?.[0];

    if(videoFile) {
      const ytRes = await youtube.videos.insert({
        auth,
        part:"snippet,status",
        requestBody: {
          snippet: {
            title: "Product Video",
            description: "Bagnest product",
            categoryId: "22",
          },
          status: {
            privacyStatus: "unlisted",
          },
        },
        media: {
          body: fs.createReadStream(videoFile.path),
         
        },
      });
       console.log("after 1");

      videoId = ytRes.data.id;
      console.log("From inside: ", videoId);
    }

    console.log("This is id: ", videoId);

    await Promise.all([
      ...(req.files.image || []).map(f => fsPromises.unlink(f.path)),
      ...(req.files.video || []).map(f => fsPromises.unlink(f.path)),
    ]);


    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: images,
      video: videoId ? [videoId] : [],
      height: req.body.height,
      width: req.body.width,
      num_of_pockets: req.body.no_of_pockets,
    });

    await product.save();

    return res.status(201).json({
      message: "Product uploaded successfully",
      product,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
};
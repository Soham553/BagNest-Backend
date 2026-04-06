import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
import Product from "../models/product.model.js";

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, height, width, no_of_pockets } = req.body;

    const updateData = {
      name,
      price,
      height,
      width,
      no_of_pockets,
    };
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
    }catch(e){
      console.log("This is error: ", e);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};
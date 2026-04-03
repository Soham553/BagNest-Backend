import fs from "fs/promises";
import cloudinary from "../utils/cloudinary.js";
import Product from "../models/product.model.js";

export const uploadProduct = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "Image is required" });
    }
    
    const uploadpromises = req.files.map(file => 
      cloudinary.uploader.upload(file.path, {
        folder: "products"
      })
    );

    const results = await Promise.all(uploadpromises);

    const images = results.map(result => result.secure_url);

    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "products",
    // });

    await Promise.all(
      req.files.map(file => fs.unlink(file.path))
    );

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: images,
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
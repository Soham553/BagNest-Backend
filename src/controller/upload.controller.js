import fs from "fs/promises";
import cloudinary from "../utils/cloudinary.js";
import Product from "../models/product.model.js";

export const uploadProduct = async (req, res) => {
  try {
    // ✅ Correct check for single upload
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ✅ Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    // ✅ Delete temp file
    await fs.unlink(req.file.path);

    // ✅ Create product
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: result.secure_url,
      height: req.body.height,
      width: req.body.width,
      num_of_pockets: req.body.num_of_pockets,
    });

    await product.save();

    return res.status(201).json({
      message: "Product uploaded successfully",
      product,
    });

  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
};
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
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      updateData.image = result.secure_url;
      fs.unlinkSync(req.file.path);
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
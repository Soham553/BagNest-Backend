import fs from "fs/promises";
import cloudinary from "../utils/cloudinary.js";
import Product from "../models/product.model.js";

export const uploadProduct = async (req, res) => {
    try {
        if(!req.files){
            return res.status(400).json({ message: "Image is required " });
        }
        console.log(filePath);
        const result = await cloudinary.uploader.upload(req.files.image[0].path, {
            folder: "products"
        });

        await fs.unlink(filePath);

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: result.secure_url,
            height: req.body.height,
            width: req.body.width,
            num_of_pockets: req.body.num_of_pockets
        });

        await product.save();
        res.status(201).json({
            message: "Product uploaded successfully",
            product
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


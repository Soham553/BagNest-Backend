import fs from "fs/promises";
import cloudinary from "../utils/cloudinary.js";
import Product from "../models/product.model.js";

export const uploadProduct = async (req, res) => {
    try {
        const result = " "
        if(!req.files){
            return res.status(400).json({ message: "Image is required " });
        }
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products",
            });

            updateData.image = result.secure_url;

            await fs.promises.unlink(req.file.path);
        }

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


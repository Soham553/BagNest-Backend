import Product from "../models/product.model.js";

export const getproducts = async (req, res) => {
    try{
        const Products = await Product.find();

        res.status(200).json({
            count: Products.length,
            Products 
         });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 
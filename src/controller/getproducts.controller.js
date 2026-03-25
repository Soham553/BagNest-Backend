import Product from "../models/product.model.js";

export const getproducts = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    try{
        const Products = await Product.find()
        .skip(skip)
        .limit(limit)
        .lean();

        res.status(200).json({
            count: Products.length,
            Products 
        });

    }
    
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 
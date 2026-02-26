import Product from "../models/product.model.js";

export const deleteProducts = async (req, res) => {
    try{
       const id = req.params.id;
        const deleteproduct = await Product.findByIdAndDelete(id);

        if (!deleteproduct) {
        return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    }catch{
        res.status(500).json({message: "server Error", error:error.message});
    }
}

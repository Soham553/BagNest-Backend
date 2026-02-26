import { Router } from "express";
import { upload } from "../middleware/file.middleware.js";
import { uploadProduct } from "../controller/upload.controller.js";
import { getproducts } from "../controller/getproducts.controller.js";
import { deleteProducts } from "../controller/deleteProducts.controller.js";
import { update } from "../controller/update.controller.js";
import { adminLogin } from "../controller/login.controller.js";

const router = Router()

router.post("/upload", upload.single("image"), uploadProduct);
router.route("/products").get(getproducts);
router.route("/products/:id").delete(deleteProducts);
router.put(
  "/products/:id",
  upload.single("image"),
  update
);
router.route("/login").post(adminLogin)



export default router;
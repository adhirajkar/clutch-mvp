const express = require("express");
const Product = require("../models/product.model");
const { createCRUDController } = require("../plugins/crud/controllers");
const { protect } = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

const productController = createCRUDController(Product, ["name", "category"]);
const router = express.Router();

// Define routes with specific role requirements
router.post("/", protect, authorizeRoles("admin"), productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.put("/:id", protect, authorizeRoles("admin"), productController.update);
router.delete("/:id", protect, authorizeRoles("admin"), productController.remove);

module.exports = router;

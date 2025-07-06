const express = require("express");
const User = require("../models/user.model");
const { createCRUDController } = require("../plugins/crud/controllers");
const { protect } = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

const userController = createCRUDController(User, ["email", "role"]);
const userRoutes = express.Router();

userRoutes.post("/", protect, authorizeRoles("admin", "user"), userController.create);
userRoutes.get("/", protect, authorizeRoles("admin"), userController.getAll);
userRoutes.get("/:id", protect, authorizeRoles("admin", "user"), userController.getOne);
userRoutes.put("/:id", protect, authorizeRoles("admin", "user"), userController.update);
userRoutes.delete("/:id", protect, authorizeRoles("admin", "user"), userController.remove);

module.exports = userRoutes;
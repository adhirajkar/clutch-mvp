const express = require("express");

const createCRUDRoutes = (controller, authMiddleware) => {
  const router = express.Router();

  // You can wrap routes with authMiddleware or RBAC here
  router.post("/", authMiddleware, controller.create);
  router.get("/", authMiddleware, controller.getAll);
  router.get("/:id", authMiddleware, controller.getOne);
  router.put("/:id", authMiddleware, controller.update);
  router.delete("/:id", authMiddleware, controller.remove);

  return router;
};

module.exports = createCRUDRoutes;

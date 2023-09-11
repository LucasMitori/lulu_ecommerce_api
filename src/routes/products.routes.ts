import { Router } from "express";
import "dotenv/config";
import { ensureDataValidationMiddleware } from "../middlewares/ensureDataValidation.middleware";
import { ensureAuthMiddleware } from "../middlewares/ensure.authorization.middleware";
import { registerProductRequestSchema } from "../schemas/products.schemas";
import {
  deleteProductController,
  listProductsByCategoryController,
  listProductsController,
  registerProductController,
  updateProductController,
} from "../controllers/product.controllers";
import { ensureValidRequestInputMiddleware } from "../middlewares/ensureValidRequestInput.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdm.middleware";

export const productRoutes = Router();

productRoutes.get("", ensureAuthMiddleware, listProductsController);

productRoutes.get(
  "/:category",
  ensureAuthMiddleware,
  listProductsByCategoryController
);

productRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDataValidationMiddleware(registerProductRequestSchema),
  registerProductController
);

productRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureValidRequestInputMiddleware,
  updateProductController
);

productRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmin,
  deleteProductController
);

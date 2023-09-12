import { Router } from "express";
import "dotenv/config";
import {
  ListAllPurchasesController,
  ListPersonalPurchasesController,
  deletePurchaseController,
  registerMultiplePurchasesController,
} from "../controllers/purchases.controllers";
import { ensureDataValidationMiddleware } from "../middlewares/ensureDataValidation.middleware";
import { purchaseRequestSchema } from "../schemas/purchases.schemas";
import { ensureAuthMiddleware } from "../middlewares/ensure.authorization.middleware";
import { ensureInputIsUuidMiddleware } from "../middlewares/ensureInputIsUuid.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { checkProductStockMiddleware } from "../middlewares/checkProductStock.middleware";

export const purchasesRoutes = Router();

purchasesRoutes.get("", ensureAuthMiddleware, ListAllPurchasesController);

purchasesRoutes.get(
  "/user/:id",
  ensureInputIsUuidMiddleware,
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  ListPersonalPurchasesController
);

purchasesRoutes.post(
  "/",
  ensureAuthMiddleware,
  ensureDataValidationMiddleware(purchaseRequestSchema),
  checkProductStockMiddleware,
  registerMultiplePurchasesController
);

purchasesRoutes.delete("/:id", ensureAuthMiddleware, deletePurchaseController);

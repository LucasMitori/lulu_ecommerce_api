import { Router } from "express";
import "dotenv/config";
import {
  ListAllPurchasesController,
  ListPersonalPurchasesController,
  deletePurchaseController,
  registerPurchaseController,
} from "../controllers/purchases.controllers";
import { ensureDataValidationMiddleware } from "../middlewares/ensureDataValidation.middleware";
import { purchaseRequestSchema } from "../schemas/purchases.schemas";
import { ensureAuthMiddleware } from "../middlewares/ensure.authorization.middleware";
import { ensureInputIsUuidMiddleware } from "../middlewares/ensureInputIsUuid.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";

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
  "/:id",
  ensureAuthMiddleware,
  ensureDataValidationMiddleware(purchaseRequestSchema),
  registerPurchaseController
);

purchasesRoutes.delete("/:id", ensureAuthMiddleware, deletePurchaseController);

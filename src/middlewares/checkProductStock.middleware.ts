import { Request, Response, NextFunction } from "express";
import { ProductPurchases } from "../entities/product_purchase.entity";
import { AppError } from "../errors";
import { AppDataSource } from "../data-source";
import { Products } from "../entities/products.entity";

// Define an interface for purchaseItem
interface PurchaseItem {
  productId: number;
  quantity: number;
  // Add other properties if needed
}

export const checkProductStockMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productPurchaseRepository =
    AppDataSource.getRepository(ProductPurchases);
  const productRepository = AppDataSource.getRepository(Products);

  const purchases: PurchaseItem[] = req.body.purchases; // Use the interface

  for (const purchaseItem of purchases) {
    const productPurchase = await productPurchaseRepository.findOne({
      where: { product: { id: purchaseItem.productId } },
    });

    if (!productPurchase) {
      return next(
        new AppError(
          `Product purchase not found for productId: ${purchaseItem.productId}`
        )
      );
    }

    const product = await productRepository.findOne({
      where: { id: purchaseItem.productId },
    });

    if (!product) {
      return next(
        new AppError(
          `Product not found for productId: ${purchaseItem.productId}`
        )
      );
    }

    if (productPurchase.quantity + purchaseItem.quantity > product.instock) {
      return next(
        new AppError(
          `Not enough stock to complete the purchase for productId: ${purchaseItem.productId}, the actual stock is: ${product.instock}`,
          409
        )
      );
    }
  }

  next();
};

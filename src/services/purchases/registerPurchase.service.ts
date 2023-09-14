import { AppDataSource } from "../../data-source";
import { ProductPurchases } from "../../entities/product_purchase.entity";
import { Products } from "../../entities/products.entity";
import { Purchases } from "../../entities/purchases.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { INewPurchase, IPurchase } from "../../interfaces/purchases.interfaces";

export const registerPurchaseService = async (
  purchase: INewPurchase,
  userID: string,
  productId: number,
  token: string
): Promise<INewPurchase> => {
  const userRepository = AppDataSource.getRepository(User);
  const purchaseRepository = AppDataSource.getRepository(Purchases);
  const productPurchaseRepository =
    AppDataSource.getRepository(ProductPurchases);
  const productRepository = AppDataSource.getRepository(Products);

  const user = await userRepository.findOne({
    where: { id: userID },
  });

  if (!user) {
    throw new AppError("User not found");
  }

  const existingPurchase = await purchaseRepository.findOne({
    where: { paymentID: purchase.paymentID },
  });

  if (existingPurchase) {
    throw new AppError("Purchase with the same paymentID was found.");
  }

  const productPurchases: ProductPurchases[] = [];

  const productsToPurchase: {
    productId: number;
    quantity: number;
  }[] = [];

  for (const purchaseItem of purchase.purchases) {
    const newProductPurchase = new ProductPurchases();

    const productPurchase = await productPurchaseRepository.findOne({
      where: { product: { id: purchaseItem.productId } },
    });

    if (!productPurchase) {
      throw new AppError(
        `Product purchase not found for productId: ${purchaseItem.productId}`
      );
    }

    productPurchase.product = await productRepository.findOne({
      where: { id: purchaseItem.productId },
    });

    if (!productPurchase.product) {
      throw new AppError(
        `Product not found for productId: ${purchaseItem.productId}`
      );
    }

    productPurchase.product.instock -= purchaseItem.quantity;

    await productRepository.save(productPurchase.product);

    const newTotal = +(
      productPurchase.price * purchaseItem.quantity -
      productPurchase.price *
        purchaseItem.quantity *
        (productPurchase.discount / 100)
    ).toFixed(2);

    newProductPurchase.product = productPurchase.product;
    newProductPurchase.price = productPurchase.price;
    newProductPurchase.quantity = purchaseItem.quantity;
    newProductPurchase.discount = productPurchase.discount;
    newProductPurchase.total = newTotal;
    newProductPurchase.purchaseDate = new Date();

    productPurchases.push(newProductPurchase);
    productsToPurchase.push({
      productId: purchaseItem.productId,
      quantity: purchaseItem.quantity,
    });
  }

  await Promise.all(
    productPurchases.map((p) => productPurchaseRepository.save(p))
  );

  const newPurchase = purchaseRepository.create({
    paymentID: purchase.paymentID,
    purchaseStatus: purchase.purchaseStatus,
    qrCode: purchase.qrCode,
    user,
    productPurchases,
  });

  await purchaseRepository.save(newPurchase);

  const total = productPurchases.reduce(
    (sum, productPurchase) => sum + productPurchase.total,
    0
  );

  const result: INewPurchase = {
    paymentID: purchase.paymentID,
    purchaseStatus: purchase.purchaseStatus,
    qrCode: purchase.qrCode,
    purchases: purchase.purchases,
    total,
    userId: userID,
    quantity: purchase.quantity,
  };

  return result;
};

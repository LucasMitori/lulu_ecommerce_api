import { AppDataSource } from "../../data-source";
import { ProductPurchases } from "../../entities/product_purchase.entity";
import { Products } from "../../entities/products.entity";
import { Purchases } from "../../entities/purchases.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { INewPurchase, IPurchase } from "../../interfaces/purchases.interfaces";

export const registerPurchaseService = async (
  purchase: IPurchase,
  userID: string,
  productId: number,
  token: string
): Promise<INewPurchase> => {
  const userRepository = AppDataSource.getRepository(User);
  const purchaseRepository = AppDataSource.getRepository(Purchases);
  const productPurchaseRepository = AppDataSource.getRepository(ProductPurchases);
  const productRepository = AppDataSource.getRepository(Products);

  const user = await userRepository.findOne({
    where: { id: userID },
  });

  if (!user) {
    throw new AppError("User not found");
  }

  const productPurchase = await productPurchaseRepository.findOne({
    where: { product: { id: productId } },
  });

  if (!productPurchase) {
    throw new AppError("Product purchase not found");
  }

  const existingPurchase = await purchaseRepository.findOne({
    where: { paymentID: purchase.paymentID },
  });

  if (existingPurchase) {
    throw new AppError("Purchase with the same paymentID was found.");
  }

  const product = await productRepository.findOne({
    where: { id: productId },
  });

  if (!product) {
    throw new AppError("Product not found");
  }

  const newTotal = +(productPurchase.price * purchase.quantity -
    ((productPurchase.price * purchase.quantity) * (productPurchase.discount/100))).toFixed(2);
  

  if (productPurchase.quantity + purchase.quantity > product.instock) {
    throw new AppError(`Not enough stock to complete the purchase. the stock is: ${product.instock}`, 409);
  }

  productPurchase.quantity = purchase.quantity;
  productPurchase.total = newTotal;
  productPurchase.purchaseDate = new Date();

  const newPurchase = purchaseRepository.create({
    paymentID: purchase.paymentID,
    purchaseStatus: purchase.purchaseStatus,
    qrCode: purchase.qrCode,
    user,
    productPurchases: [productPurchase],
  });

  product.instock -= purchase.quantity;

  await Promise.all([
    purchaseRepository.save(newPurchase),
    productPurchaseRepository.save(productPurchase),
    productRepository.save(product),
  ]);

  const result = {
    paymentID: purchase.paymentID,
    purchaseStatus: purchase.purchaseStatus,
    qrCode: purchase.qrCode,
    quantity: productPurchase.quantity,
    total: productPurchase.total,
    userId: userID,
  };

  return result;
};

import { AppDataSource } from "../../data-source";
import { Purchases } from "../../entities/purchases.entity";
import { IPurchaseResponse } from "../../interfaces/purchases.interfaces";
import { AppError } from "../../errors";

export const getOnePurchaseService = async (
  paymentId: number
): Promise<IPurchaseResponse | null> => {
  const purchaseRepository = AppDataSource.getRepository(Purchases);

  // Find the purchase by paymentId
  const purchase = await purchaseRepository
    .createQueryBuilder("purchases")
    .leftJoinAndSelect("purchases.productPurchases", "product_purchases")
    .leftJoinAndSelect("product_purchases.product", "products")
    .where("purchases.paymentID = :paymentId", { paymentId })
    .getOne();

  if (!purchase) {
    throw new AppError("Purchase not found");
  }
  console.log(purchase);

  // Transform the purchase data into the desired response format
  const productPurchases = purchase.productPurchases.map((pp) => ({
    id: pp.id,
    name: pp.product.name,
    size: pp.product.size,
    price: pp.price,
    discount: pp.discount,
    quantity: pp.quantity,
    total: pp.total,
    createdAt: pp.createdAt,
    updatedAt: pp.updatedAt,
  }));

  const purchaseResponse: IPurchaseResponse = {
    paymentID: purchase.paymentID,
    purchaseStatus: purchase.purchaseStatus,
    qrCode: purchase.qrCode,
    product_purchases: productPurchases,
  };

  return purchaseResponse;
};

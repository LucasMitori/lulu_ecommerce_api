import { AppDataSource } from "../../data-source";
import { Purchases } from "../../entities/purchases.entity";
import { IPurchaseResponse } from "../../interfaces/purchases.interfaces";
import { listAllPurchaseSchema } from "../../schemas/purchases.schemas";

export const ListAllPersonalPurchaseService = async (
  userId: string
): Promise<IPurchaseResponse[]> => {
  const purchaseRepository = AppDataSource.getRepository(Purchases);

  const purchases = await purchaseRepository
    .createQueryBuilder("purchases")
    .leftJoinAndSelect("purchases.productPurchases", "product_purchases")
    .leftJoinAndSelect("product_purchases.product", "products")
    .where("purchases.userId = :userId", { userId })
    .getMany();

  const purchaseResponse: IPurchaseResponse[] = purchases.map((purchase) => {
    const productPurchases = purchase.productPurchases.map((pp) => ({
      id: pp.id,
      name: pp.product.name,
      price: pp.price,
      discount: pp.discount,
      quantity: pp.quantity,
      total: pp.total,
      createdAt: pp.createdAt,
      updatedAt: pp.updatedAt,
    }));

    return {
      paymentID: purchase.paymentID,
      purchaseStatus: purchase.purchaseStatus,
      qrCode: purchase.qrCode,
      product_purchases: productPurchases,
    };
  });

  const validatedPurchaseResponse = await listAllPurchaseSchema.validate(
    purchaseResponse,
    {
      stripUnknown: true,
    }
  );

  return validatedPurchaseResponse;
};

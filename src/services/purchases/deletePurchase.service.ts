import { AppDataSource } from "../../data-source";
import { Purchases } from "../../entities/purchases.entity";
import { AppError } from "../../errors";

export const deletePurchaseService = async (id: number): Promise<object> => {
  const purchaseRepository = AppDataSource.getRepository(Purchases);

  const purchaseToDelete = await purchaseRepository
    .find({
      where: { paymentID: id },
      relations: ["productPurchases"],
    })
    .catch(() => {
      throw new AppError("Purchase not found", 404);
    });

  if (!purchaseToDelete) {
    throw new AppError("Purchase not found", 404);
  }

  await purchaseRepository
    .createQueryBuilder()
    .relation(Purchases, "productPurchases")
    .of(purchaseToDelete)
    .remove(purchaseToDelete[0].productPurchases);

  await purchaseRepository
    .createQueryBuilder()
    .softDelete()
    .from(Purchases)
    .where("id = :id", { id: purchaseToDelete[0].id })
    .execute();

  return {};
};

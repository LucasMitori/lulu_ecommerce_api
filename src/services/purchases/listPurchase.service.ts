import { AppDataSource } from "../../data-source";
import { Purchases } from "../../entities/purchases.entity";
import { IPurchaseList } from "../../interfaces/purchases.interfaces";
import { listPurchaseSchema } from "../../schemas/purchases.schemas";

export const listPurchaseService = async (): Promise<IPurchaseList[]> => {
  const purchaseRepository = AppDataSource.getRepository(Purchases);

  const result = await purchaseRepository.find();

  const allPurchases = await listPurchaseSchema.validate(result, {
    stripUnknown: true,
  });

  return allPurchases;
};

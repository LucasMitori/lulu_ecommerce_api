import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { IPurchaseUpdate } from "../../interfaces/purchases.interfaces";
import { ProductPurchases } from "../../entities/product_purchase.entity";
import { Purchases } from "../../entities/purchases.entity";
import { updatePurchaseSchema } from "../../schemas/purchases.schemas";

export const updatePurchaseService = async (
  purchaseID: number,
  purchaseData: IPurchaseUpdate
) => {
  const purchaseRepository = AppDataSource.getRepository(Purchases);
  console.log(purchaseID);
  const purchaseToUpdate = await purchaseRepository
    .findOne({
      where: {
        paymentID: purchaseID, // Use the correct field for the query
      },
    })
    .catch(() => {
      throw new AppError("Purchase not found", 404);
    });

  if (purchaseData.purchaseStatus) {
    purchaseToUpdate.purchaseStatus = purchaseData.purchaseStatus;
  }

  if (purchaseData.qrCode) {
    purchaseToUpdate.qrCode = purchaseData.qrCode;
  }

  // Add more fields to update as needed

  const updatedPurchase = {
    ...purchaseToUpdate,
    ...purchaseData,
  };

  // Update related product purchases if needed
  // ...

  console.log(updatedPurchase);

  await purchaseRepository.save(updatedPurchase);

  const purchaseUpdated = await updatePurchaseSchema.validate(updatedPurchase, {
    stripUnknown: true,
  });

  return purchaseUpdated;
};

import { registerPurchaseService } from "./../services/purchases/registerPurchase.service";
import { Request, Response } from "express";
import {
  INewPurchase,
  IPurchase,
  IPurchaseUpdate,
} from "../interfaces/purchases.interfaces";
import { deletePurchaseService } from "../services/purchases/deletePurchase.service";
import { listPurchaseService } from "../services/purchases/listPurchase.service";
import { ListAllPersonalPurchaseService } from "../services/purchases/listAllPersonalPurchase.service";
import { getOnePurchaseService } from "../services/purchases/getOnePurchase.service";
import { updatePurchaseService } from "../services/purchases/updatePurchase.service";

export const ListAllPurchasesController = async (
  req: Request,
  res: Response
) => {
  const allPurchases = await listPurchaseService();
  return res.json(allPurchases);
};

export const ListPersonalPurchasesController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const personalPurchases = await ListAllPersonalPurchaseService(id);
  return res.json(personalPurchases);
};

export const ListOnePurchaseController = async (
  req: Request,
  res: Response
) => {
  const { payid } = req.params;

  const personalPurchases = await getOnePurchaseService(Number(payid));
  return res.json(personalPurchases);
};

export const registerMultiplePurchasesController = async (
  req: Request,
  res: Response
) => {
  const purchaseInformation: { purchases: IPurchase[] } = req.body; // An object with a "purchases" property
  const token: string = req.headers.authorization;
  const userID: string = req.user.id;

  const results: INewPurchase[] = [];

  for (const purchase of purchaseInformation.purchases) {
    const productID: number = purchase.productId; // Extract the product ID from the purchase object

    // Create an INewPurchase object from the IPurchase object
    const newPurchase: INewPurchase = {
      paymentID: purchase.paymentID,
      purchaseStatus: purchase.purchaseStatus,
      qrCode: purchase.qrCode,
      purchases: [{ productId: productID, quantity: purchase.quantity }],
      total: 0, // You may need to calculate this based on the product prices
      userId: userID,
      quantity: purchase.quantity,
    };

    const data = await registerPurchaseService(
      newPurchase,
      userID,
      productID,
      token
    );
    results.push(data);
  }

  return res.status(201).json(results);
};

export const updatePurchaseController = async (req: Request, res: Response) => {
  const productData: IPurchaseUpdate = req.body;
  const productID: number = parseInt(req.params.id);
  const updatedUser = await updatePurchaseService(productID, productData);
  return res.json(updatedUser);
};

export const deletePurchaseController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const response = await deletePurchaseService(id);
  return res.status(204).json(response);
};

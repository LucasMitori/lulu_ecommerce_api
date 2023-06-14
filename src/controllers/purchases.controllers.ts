import { registerPurchaseService } from './../services/purchases/registerPurchase.service';
import { Request, Response } from "express";
import { IPurchase } from "../interfaces/purchases.interfaces";
import { deletePurchaseService } from '../services/purchases/deletePurchase.service';
import { listPurchaseService } from '../services/purchases/listPurchase.service';
import { ListAllPersonalPurchaseService } from '../services/purchases/listAllPersonalPurchase.service';

export const ListAllPurchasesController = async (req: Request, res: Response) => {
  const allPurchases = await listPurchaseService();
  return res.json(allPurchases)
}

export const ListPersonalPurchasesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const personalPurchases = await ListAllPersonalPurchaseService(id);
  return res.json(personalPurchases)
}

export const registerPurchaseController = async (req: Request, res: Response) => {
  const purchaseInformation: IPurchase = req.body;
  const token: string = req.headers.authorization;
  const userID: string = req.user.id;
  const productID: number = parseInt(req.params.id)

  const data = await registerPurchaseService(purchaseInformation, userID, productID, token);

  return res.status(201).json(data);
};

export const deletePurchaseController = async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id)
  const response = await deletePurchaseService(id);
  return res.status(204).json(response)
}
import { Request, Response } from "express";
import { IProductUpdate, IRegisterProduct } from "../interfaces/products.interfaces";
import { registerProductService } from "../services/products/registerProduct.service";
import { listAllProductService } from "../services/products/listAllProducts.service";
import { updateProductService } from "../services/products/updateProduct.service";
import { deleteProductService } from "../services/products/deleteProduct.service";

export const listProductsController = async(req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const { data, total } = await listAllProductService({ page, limit });

  const totalPages = Math.ceil(total / limit);

  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  const links = {
    ...(nextPage && { next: `/products?page=${nextPage}&limit=${limit}` }),
    ...(prevPage && { prev: `/products?page=${prevPage}&limit=${limit}` }),
  };

  return res.status(200).json({ data, total, links });
};


export const registerProductController = async(req: Request, res: Response) => {
    const productRegistered: IRegisterProduct = req.body;
    const token: string = req.headers.authorization;
    const id: string = req.user.id;

    const data = await registerProductService(productRegistered, token, id);
    return res.status(201).json(data);
}

export const updateProductController = async (req: Request, res: Response) => {
    const productData: IProductUpdate = req.body;
    const productID: number = parseInt(req.params.id)
    const updatedUser = await updateProductService(productID, productData);
    return res.json(updatedUser);
  };

  export const deleteProductController = async (
    req: Request,
    res: Response
  ) => {
    const productID: number = parseInt(req.params.id)
    const response = await deleteProductService(productID);
    return res.status(204).json(response);
  };
  
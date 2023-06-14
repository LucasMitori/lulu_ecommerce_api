import { AppDataSource } from "../../data-source";
import { Products } from "../../entities/products.entity";
import { AppError } from "../../errors";

export const deleteProductService = async (
  productID: number
): Promise<Object> => {
  const productRepository = AppDataSource.getRepository(Products);
  const productDeleted = await productRepository
    .findOneByOrFail({
      id: productID,
    })
    .catch(() => {
      throw new AppError("Product not found", 404);
    });

  await productRepository.softRemove(productDeleted);

  return {};
};

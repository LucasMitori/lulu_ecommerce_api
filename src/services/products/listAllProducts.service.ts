import { AppDataSource } from "../../data-source";
import { Products } from "../../entities/products.entity";
import { IListProduct } from "../../interfaces/products.interfaces";
import { listAllProductSchema } from "../../schemas/products.schemas";

interface IPaginationParams {
  page: number;
  limit: number;
}

export const listAllProductService = async (
  paginationParams: IPaginationParams
): Promise<{ data: IListProduct[]; total: number }> => {
  const { page, limit } = paginationParams;

  const productRepository = AppDataSource.getRepository(Products);

  const [result, total] = await productRepository
    .createQueryBuilder("products")
    .leftJoinAndSelect("products.productPurchases", "productPurchases")
    .select([
      "products.id",
      "products.name",
      "products.description",
      "products.size",
      "products.imageUrl",
      "products.category",
      "products.instock",
      "products.tags",
      "products.reviews",
      "products.productAvailable",
      "productPurchases.price",
      "productPurchases.discount",
      "products.expirationDate",
      "products.brand",
      "products.carouselImages",
    ])
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  const allProducts = await listAllProductSchema.validate(result, {
    stripUnknown: false,
  });

  return {
    data: allProducts,
    total,
  };
};

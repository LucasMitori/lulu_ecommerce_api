import { AppDataSource } from "../../data-source";
import { Products } from "../../entities/products.entity";
import { User } from "../../entities/user.entity";
import {
  INewProduct,
  IRegisterProduct,
} from "../../interfaces/products.interfaces";
import { ProductPurchases } from "../../entities/product_purchase.entity";
import { AppError } from "../../errors";

export const registerProductService = async (
  product: IRegisterProduct,
  token: string,
  id: string
): Promise<INewProduct> => {
  const userRepository = AppDataSource.getRepository(User);
  const productRepository = AppDataSource.getRepository(Products);
  const productPurchaseRepository =
    AppDataSource.getRepository(ProductPurchases);

  const user = await userRepository.findOne({
    where: { id },
  });

  if (!user) {
    throw new AppError("User not found");
  }

  await productRepository.save(product);

  const newProduct = {
    price: product.price,
    discount: product.discount,
    product: product,
    expirationDate: new Date(product.expirationDate),
    brand: product.brand,
    carouselImages: product.carouselImages,
  };

  await productPurchaseRepository.save(newProduct);

  const result = { ...product, newProduct };

  delete result.newProduct;

  return result as INewProduct;
};

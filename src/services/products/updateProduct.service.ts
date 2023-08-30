import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { IProductUpdate } from "../../interfaces/products.interfaces";
import { Products } from "../../entities/products.entity";
import { updateProductSchema } from "../../schemas/products.schemas";
import { ProductPurchases } from "../../entities/product_purchase.entity";

export const updateProductService = async (
  productID: number,
  productData: IProductUpdate
): Promise<IProductUpdate> => {
  const productRepository = AppDataSource.getRepository(Products);
  const productToUpdate = await productRepository
    .findOneByOrFail({
      id: productID,
    })
    .catch(() => {
      throw new AppError("Product not found", 404);
    });

  if (productData.expirationDate) {
    const expirationDate = new Date(productData.expirationDate);

    productToUpdate.expirationDate = expirationDate;
  }

  const updatedProduct = {
    ...productToUpdate,
    ...productData,
  };

  if (productData.price || productData.discount) {
    const productPurchasesRepository =
      AppDataSource.getRepository(ProductPurchases);

    const productPurchasesToUpdate = await productPurchasesRepository.find({
      where: {
        product: { id: productToUpdate.id },
      },
    });

    const updatedProductPurchases = productPurchasesToUpdate.map(
      (productPurchase) => {
        return {
          ...productPurchase,
          price: productData.price ?? productPurchase.price,
          discount: productData.discount ?? productPurchase.discount,
        };
      }
    );

    await productPurchasesRepository.save(updatedProductPurchases);
  }

  await productRepository.save(updatedProduct);

  const productUpdated = await updateProductSchema.validate(updatedProduct, {
    stripUnknown: true,
  });

  return productUpdated;
};

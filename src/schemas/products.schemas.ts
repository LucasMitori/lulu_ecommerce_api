import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProduct, IProductUpdate, IRegisterProduct } from "../interfaces/products.interfaces";

const registerProductRequestSchema: SchemaOf<IRegisterProduct> = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    imageUrl: yup.string().required(),
    category: yup.string().required(),
    instock: yup.number().required(),
    tags: yup.array().required(),
    reviews: yup.array().required(),
    productAvailable: yup.string().required(),
    price: yup.number().required(),
    discount: yup.number().required(),
  });

const listAllProductSchema: SchemaOf<IProduct[]> = yup.array(
yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    description: yup.string().required(),
    imageUrl: yup.string(),
    category: yup.string().required(),
    instock: yup.number().required(),
    tags: yup.array().of(yup.string()),
    reviews: yup.array().of(yup.string()),
    productAvailable: yup.string().required(),
    createdAt: yup.date(),
    updatedAt: yup.date(),
    deletedAt: yup.date().nullable(),
    productsPurchases: yup.array().of(
    yup.object().shape({
        id: yup.number().required(),
        quantity: yup.number().required(),
        createdAt: yup.date().notRequired(),
        updatedAt: yup.date().notRequired(),
        deletedAt: yup.date().nullable(),
    })
    ),
    price: yup.number().notRequired(),
    discount: yup.number().notRequired()
})
);

const updateProductSchema: SchemaOf<IProductUpdate> = yup.object().shape({
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),
    imageUrl: yup.string().notRequired(),
    category: yup.string().notRequired(),
    instock: yup.number().notRequired(),
    tags: yup.array().of(yup.string()).notRequired(),
    reviews: yup.array().of(yup.string()).notRequired(),
    productAvailable: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    deletedAt: yup.date().nullable().notRequired(),
    productsPurchases: yup.array().of(
    yup.object().shape({
        id: yup.number().notRequired(),
        quantity: yup.number().notRequired(),
        createdAt: yup.date().notRequired(),
        updatedAt: yup.date().notRequired(),
        deletedAt: yup.date().nullable().notRequired(),
    })
    ),
    price: yup.number().notRequired(),
    discount: yup.number().notRequired()
  });
  

export {
    registerProductRequestSchema,
    listAllProductSchema,
    updateProductSchema,
};
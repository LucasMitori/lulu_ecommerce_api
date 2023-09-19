import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IPurchase,
  IPurchaseList,
  IPurchaseResponse,
} from "../interfaces/purchases.interfaces";

const productPurchaseSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  price: yup.number().required(),
  discount: yup.number().required(),
  quantity: yup.number().required(),
  total: yup.number().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
});

const purchaseResponseSchema: SchemaOf<IPurchaseResponse> = yup.object().shape({
  paymentID: yup.number().required(),
  purchaseStatus: yup.string().required(),
  qrCode: yup.string().notRequired(),
  product_purchases: yup.array(productPurchaseSchema).required(),
});

const purchaseRequestSchema: SchemaOf<{ purchases: IPurchase[] }> = yup
  .object()
  .shape({
    purchases: yup.array().of(
      yup.object().shape({
        paymentID: yup.number().required(),
        purchaseStatus: yup.string().required(),
        qrCode: yup.string().notRequired(),
        productId: yup.number().required(),
        quantity: yup.number().required(),
      })
    ),
  });

const listAllPurchaseSchema: SchemaOf<IPurchaseResponse[]> = yup.array(
  yup.object().shape({
    paymentID: yup.number().required(),
    purchaseStatus: yup.string().required(),
    qrCode: yup.string().notRequired(),
    product_purchases: yup.array(productPurchaseSchema).required(),
  })
);

const listPurchaseSchema: SchemaOf<IPurchaseList[]> = yup.array(
  yup.object().shape({
    paymentID: yup.number().required(),
    purchaseStatus: yup.string().required(),
    qrCode: yup.string().notRequired(),
  })
);

const updatePurchaseSchema = yup.object().shape({
  id: yup.string().required(),
  paymentID: yup.number().required(),
  purchaseStatus: yup.string().required(),
  qrCode: yup.string().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
});

export {
  purchaseRequestSchema,
  purchaseResponseSchema,
  listAllPurchaseSchema,
  listPurchaseSchema,
  updatePurchaseSchema,
};

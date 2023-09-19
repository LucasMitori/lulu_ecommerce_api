export interface IPurchase {
  paymentID: number;
  purchaseStatus: string;
  qrCode?: string;
  quantity: number;
  productId: number;
}

export interface INewPurchase {
  paymentID: number;
  purchaseStatus: string;
  qrCode?: string;
  purchases: {
    productId: number;
    quantity: number;
  }[];
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  userId: string;
}

export interface IPurchaseUpdate {
  purchaseStatus: string;
  qrCode?: string;
  quantity?: number;
  productId?: number;
}

export interface IPurchaseResponse {
  paymentID: number;
  purchaseStatus: string;
  qrCode?: string;
  product_purchases: {
    id: number;
    name: string;
    price: number;
    discount: number;
    quantity: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface IPurchaseList {
  paymentID: number;
  purchaseStatus: string;
  qrCode?: string;
}

export interface INewPurchase {
  paymentID: number;
  purchaseStatus: string;
  qrCode?: string;
  quantity: number;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  userId: string;
}

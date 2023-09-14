export interface IProduct {
  id: number;
  name: string;
  description: string;
  size: string;
  imageUrl?: string;
  category: string;
  instock: number;
  tags?: any[];
  reviews?: any[];
  productAvailable: string;
  brand: string;
  carouselImages: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  productsPurchases: IListProductPurchases[];
  price: number;
  expirationDate: Date;
  discount: number;
}

export interface IListProduct {
  id: number;
  name: string;
  description: string;
  size: string;
  imageUrl?: string;
  category: string;
  instock: number;
  tags?: any[];
  reviews?: any[];
  productAvailable: string;
  brand: string;
  carouselImages: string[];
  productsPurchases: IListProductPurchases[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  price: number;
  expirationDate: Date;
  discount: number;
}

export interface INewProduct {
  name: string;
  description: string;
  size: string;
  imageUrl: string;
  category: string;
  instock: number;
  tags: string[];
  reviews: string[];
  productAvailable: string;
  brand: string;
  carouselImages: string[];
  price: number;
  expirationDate: Date;
  discount: number;
}

export interface IRegisterProduct {
  name: string;
  description: string;
  size: string;
  imageUrl?: string;
  category: string;
  instock: number;
  tags?: any[];
  reviews?: any[];
  productAvailable: string;
  brand: string;
  carouselImages: string[];
  price: number;
  expirationDate: Date;
  discount: number;
}
export interface IProductPurchases {
  id: number;
  quantity: number;
  product: IProduct[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface IListProductPurchases {
  id: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface IProductUpdate {
  name: string;
  description: string;
  size: string;
  imageUrl?: string;
  category: string;
  instock: number;
  tags?: any[];
  reviews?: any[];
  productAvailable: string;
  brand: string;
  carouselImages: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  productsPurchases: IListProductPurchases[];
  expirationDate: Date;
  price: number;
  discount: number;
}

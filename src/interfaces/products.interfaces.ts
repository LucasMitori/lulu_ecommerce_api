export interface IProduct {
    id: number;
    name: string;
    description: string;
    imageUrl?: string;
    category: string;
    instock: number;
    tags?: any[];
    reviews?: any[];
    productAvailable: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null; 
    productsPurchases: IListProductPurchases[];
    price: number;
    discount: number;
}

export interface IListProduct {
    id: number;
    name: string;
    description: string;
    imageUrl?: string;
    category: string;
    instock: number;
    tags?: any[];
    reviews?: any[];
    productAvailable: string;
    productsPurchases: IListProductPurchases[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null; 
    price: number; 
    discount: number;
}


export interface INewProduct {
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    instock: number;
    tags: string[];
    reviews: string[];
    productAvailable: string;
    price: number;
    discount: number;
}

export interface IRegisterProduct {
    name: string;
    description: string;
    imageUrl?: string;
    category: string;
    instock: number;
    tags?: any[];
    reviews?: any[];
    productAvailable: string;
    price: number;
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
    imageUrl?: string;
    category: string;
    instock: number;
    tags?: any[];
    reviews?: any[];
    productAvailable: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null; 
    productsPurchases: IListProductPurchases[];
    price: number;
    discount: number;
}
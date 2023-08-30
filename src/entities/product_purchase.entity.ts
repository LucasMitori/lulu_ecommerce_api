import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Purchases } from "./purchases.entity";
import { Products } from "./products.entity";
import { IsNotEmpty, IsOptional, Length } from "class-validator";

@Entity("product_purchases")
export class ProductPurchases {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", width: 10, scale: 2 })
  @IsNotEmpty()
  @Length(2, 10)
  price: number;

  @Column({ type: "int", width: 10, nullable: true })
  @IsOptional()
  @Length(2, 10)
  quantity: number;

  @Column({ type: "int", width: 15 })
  @IsOptional()
  @Length(2, 15)
  discount: number;

  @Column({ type: "decimal", precision: 15, scale: 2, nullable: true })
  @IsNotEmpty()
  @Length(2, 30)
  total: number;

  @Column({ type: "timestamp", nullable: true, default: null })
  purchaseDate: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Purchases, (purchase) => purchase.productPurchases)
  @JoinColumn()
  purchase: Purchases;

  @ManyToOne(() => Products, (product) => product.productPurchases)
  @JoinColumn()
  product: Products;
}

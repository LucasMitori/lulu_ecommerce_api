import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { IsOptional, Length } from "class-validator";
import { ProductPurchases } from "./product_purchase.entity";

@Entity("purchases")
export class Purchases {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "bigint", unique: true })
  paymentID: number;

  @Column({ length: 20 })
  @IsOptional()
  @Length(2, 20)
  purchaseStatus: string;

  @Column({ length: 80 })
  @IsOptional()
  @Length(2, 80)
  qrCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @OneToMany(
    () => ProductPurchases,
    (productPurchases) => productPurchases.purchase
  )
  productPurchases: ProductPurchases[];
}

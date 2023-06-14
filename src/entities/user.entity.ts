import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";
import { hashSync } from "bcryptjs";
import { Purchases } from "./purchases.entity";
import {
  IsNotEmpty,
  IsOptional,
  Matches,
  Length,
  IsEmail,
  IsEnum,
} from "class-validator";

enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  @IsNotEmpty()
  @Length(2, 50)
  firstName: string;

  @Column({ length: 50 })
  @IsNotEmpty()
  @Length(2, 50)
  lastName: string;

  @Column({ length: 10 })
  @IsEnum(Gender)
  gender: Gender;

  @Column({ length: 100 })
  @IsNotEmpty()
  @Length(3, 100)
  address: string;

  @Column({ length: 20 })
  @IsNotEmpty()
  @Length(3, 20)
  number: string;

  @Column({ length: 100 })
  @IsOptional()
  @Length(3, 100)
  complement: string;

  @Column({ length: 30 })
  @IsNotEmpty()
  @Length(2, 30)
  city: string;

  @Column({ length: 20 })
  @IsNotEmpty()
  @Length(2, 20)
  state: string;

  @Column({ length: 15 })
  @IsNotEmpty()
  @Length(2, 15)
  country: string;

  @Column({ type: "int", width: 20 })
  @IsNotEmpty()
  @Length(2, 20)
  postalCode: string;

  @Column({ unique: true, length: 60 })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ length: 120 })
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @Column({ length: 15 })
  @IsNotEmpty()
  @Matches(/^(\(?\d{2}\)?\s)?(\d{4,5}\-?\d{4})$/)
  cellphone: string;

  @Column({ unique: true })
  @Matches(
    /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})?$|^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})?$/
  )
  cpfCnpj: string;

  @Column({ length: 50 })
  @IsOptional()
  foreignerDocument: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ nullable: true, length: 120 })
  @IsOptional()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => Purchases, (purchases) => purchases.user)
  purchases: Purchases[];
}

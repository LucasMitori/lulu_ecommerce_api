import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1694723262733 implements MigrationInterface {
    name = 'InitialMigrations1694723262733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "gender" character varying(10) NOT NULL, "address" character varying(100) NOT NULL, "number" character varying(20) NOT NULL, "complement" character varying(100) NOT NULL, "city" character varying(30) NOT NULL, "state" character varying(20) NOT NULL, "country" character varying(15) NOT NULL, "postalCode" integer NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(120) NOT NULL, "cellphone" character varying(15) NOT NULL, "cpfCnpj" character varying NOT NULL, "foreignerDocument" character varying(50) NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "image" character varying(120), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_ca19874d752b7aef38f6a876227" UNIQUE ("cpfCnpj"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paymentID" bigint NOT NULL, "purchaseStatus" character varying(20) NOT NULL, "qrCode" character varying(80) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "UQ_d4ec3cf995329fe801c3abfc80e" UNIQUE ("paymentID"), CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "size" character varying(20) NOT NULL, "imageUrl" character varying(255) NOT NULL, "expirationDate" date NOT NULL, "category" character varying(100) NOT NULL, "instock" integer NOT NULL, "tags" json NOT NULL, "reviews" json NOT NULL, "productAvailable" character varying(20) NOT NULL, "brand" character varying(255) NOT NULL, "carouselImages" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_purchases" ("id" SERIAL NOT NULL, "price" numeric NOT NULL, "quantity" integer, "discount" integer NOT NULL, "total" numeric(15,2), "purchaseDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "purchaseId" uuid, "productId" integer, CONSTRAINT "PK_f28cf8bf29b23ab794dfc91f45c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_341f0dbe584866284359f30f3da" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_purchases" ADD CONSTRAINT "FK_90842378a286e56798c08314592" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_purchases" ADD CONSTRAINT "FK_0036d3e60cb3a821b63f10e2bed" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_purchases" DROP CONSTRAINT "FK_0036d3e60cb3a821b63f10e2bed"`);
        await queryRunner.query(`ALTER TABLE "product_purchases" DROP CONSTRAINT "FK_90842378a286e56798c08314592"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_341f0dbe584866284359f30f3da"`);
        await queryRunner.query(`DROP TABLE "product_purchases"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "purchases"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

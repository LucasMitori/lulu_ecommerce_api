import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserRequest,
  IUserLogin,
  IUserUpdate,
  IUserResponse,
} from "../interfaces/users.interfaces";

const userRequestSchema: SchemaOf<IUserRequest> = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  gender: yup.mixed<"male" | "female" | "other">().oneOf(["male", "female", "other"]).required(),
  address: yup.string().required(),
  number: yup.string().required(),
  complement: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
  postalCode: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  cellphone: yup.string().required(),
  cpfCnpj: yup.string().required(),
  foreignerDocument: yup.string().notRequired(),
  isAdmin: yup.boolean().notRequired(),
  image: yup.string().nullable(),
});

const userWithoutPasswordSchema: SchemaOf<IUserResponse> = yup.object().shape({
  id: yup.string(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  gender: yup.mixed<"male" | "female" | "other">().oneOf(["male", "female", "other"]).notRequired(),
  address: yup.string().required(),
  number: yup.string().required(),
  complement: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
  postalCode: yup.string().required(),
  email: yup.string().email().required(),
  cellphone: yup.string().required(),
  cpfCnpj: yup.string().required(),
  foreignerDocument: yup.string().notRequired(),
  isAdmin: yup.boolean().notRequired(),
  image: yup.string().nullable(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});

const userLoginSchema: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const userUpdateSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  firstName: yup.string().notRequired(),
  lastName: yup.string().notRequired(),
  gender: yup.mixed<"male" | "female" | "other">().oneOf(["male", "female", "other"]).required(),
  address: yup.string().notRequired(),
  number: yup.string().notRequired(),
  complement: yup.string().notRequired(),
  city: yup.string().notRequired(),
  state: yup.string().notRequired(),
  country: yup.string().notRequired(),
  postalCode: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
  cellphone: yup.string().notRequired(),
  cpfCnpj: yup.string().notRequired(),
  foreignerDocument: yup.string().notRequired(),
  image: yup.string().nullable(),
});

const listAllUsersSchema: SchemaOf<IUserResponse[]> = yup.array(
  userWithoutPasswordSchema
);

export {
  userRequestSchema,
  userWithoutPasswordSchema,
  userLoginSchema,
  userUpdateSchema,
  listAllUsersSchema,
};

export interface IUserRequest {
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  address: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  email: string;
  password: string;
  cellphone: string;
  cpfCnpj: string;
  foreignerDocument?: string;
  isAdmin?: boolean;
  image?: string;
}

export interface IUserUpdate {
  firstName?: string;
  lastName?: string;
  gender?: "male" | "female" | "other";
  address?: string;
  number?: string;
  complement?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  email?: string;
  password?: string;
  cellphone?: string;
  cpfCnpj?: string;
  foreignerDocument?: string;
  image?: string;
}

export interface IUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  address: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  email: string;
  cellphone: string;
  cpfCnpj: string;
  foreignerDocument?: string;
  isAdmin?: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  token: string;
  user: IUserResponse;
}

export interface User extends IUserResponse {
  password: string;
}

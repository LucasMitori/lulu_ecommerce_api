import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { IUserRequest } from "../interfaces/users.interfaces";

export const ensureValidRequestInputMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userData: IUserRequest = request.body;

  let invalidField = false;

  for (let key in userData) {
    if (key === "id" || key === "isAdmin") {
      invalidField = true;
    }
  }

  if (invalidField === true) {
    throw new AppError("Modification not allowed. Invalid field value", 401);
  }

  return next();
};

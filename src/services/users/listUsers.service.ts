import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users.interfaces";
import { listAllUsersSchema } from "../../schemas/user.schemas";

export const listUsersService = async (): Promise<IUserResponse[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const allUsers = await userRepository.find();

  const allUsersWithoutPassword = await listAllUsersSchema.validate(allUsers, {
    stripUnknown: true,
  });

  return allUsersWithoutPassword;
};

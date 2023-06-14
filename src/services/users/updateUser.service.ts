import { AppDataSource } from "../../data-source";
import { IUserUpdate } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { userUpdateSchema } from "../../schemas/user.schemas";
import { DeepPartial } from "typeorm";

export const updateUserService = async (
  paramsUserId: string,
  userData: IUserUpdate
): Promise<IUserUpdate> => {
  const userRepository = AppDataSource.getRepository(User);
  const userToUpdate = await userRepository
    .findOneByOrFail({
      id: paramsUserId,
    })
    .catch(() => {
      throw new AppError("User not found", 404);
    });

  const updatedUser = userRepository.create({
    ...userToUpdate,
    ...userData as DeepPartial<User>,
  });

  await userRepository.save(updatedUser);

  const userUpdatedReturn = await userUpdateSchema.validate(updatedUser, {
    stripUnknown: true,
  });

  return userUpdatedReturn;
};

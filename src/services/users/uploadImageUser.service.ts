import { AppDataSource } from "../../data-source";
import { IUserUpdate } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { userUpdateSchema } from "../../schemas/user.schemas";

export const updateImageUserService = async (
  imageData: any,
  paramsId: string
): Promise<IUserUpdate> => {
  const userRepository = AppDataSource.getRepository(User);
  const userToUpdate = await userRepository
    .findOneByOrFail({
      id: paramsId,
    })
    .catch(() => {
      throw new AppError("User not found.", 404);
    });

  const dataImport = {
    image: imageData,
  };

  const updatedUser = userRepository.create({
    ...userToUpdate,
    ...dataImport,
  });

  await userRepository.save(updatedUser);

  const userUpdatedReturn = await userUpdateSchema.validate(updatedUser, {
    stripUnknown: true,
  });

  return userUpdatedReturn;
};

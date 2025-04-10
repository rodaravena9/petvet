import bcrypt from "bcryptjs";
import { User } from "../schemas/user.schema";
import { HttpError } from "../utils/httpError.util";

// Obtener todos los usuarios
const getAllUsers = async () => {
  return await User.findAll();
};

// Obtener un usuario por su ID
const getUser = async (uid: string) => {
  try {
    const user = await User.findByPk(uid);

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    return user;
  } catch (error) {
    throw new HttpError("User not found", 500);
  }
};

/**
 * Obtener un usuario por su correo electrónico
 * @param email - Correo electrónico del usuario
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({
      where: { email } 
    });

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    return user;
  } catch (error) {
    throw new HttpError("User not found", 500);
  }
};

/**
 * Crear un usuario con email, contraseña y nombre
 * @param email - Correo electrónico del usuario
 * @param password - Contraseña del usuario
 * @param name - Nombre del usuario
 */
interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

export const createUserWithEmailAndPasswordAndName = async ({ email, password, name }: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword, name });
  return newUser;
};

// Actualizar usuario por ID
interface UpdateUserInput {
  email?: string;
  password?: string;
  name?: string;
}

const updateUserById = async (uid: string, updates: UpdateUserInput): Promise<User> => {
  const user = await getUser(uid);

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  await user.update(updates);
  return user;
};

// Eliminar usuario por ID
interface DeleteUserResponse {
  message: string;
}

const deleteUserById = async (uid: string): Promise<DeleteUserResponse> => {
  const user = await getUser(uid);

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  await user.destroy();

  return { message: "User deleted successfully" };
};



export const userService = {
  getAllUsers,
  getUser,
  getUserByEmail,
  createUserWithEmailAndPasswordAndName,
  updateUserById,
  deleteUserById,
};
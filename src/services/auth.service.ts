import logger from "../utils/logger.util";
import { generateAccessToken } from "../utils/auth.util";
import { HttpError } from "../utils/httpError.util";
import { userService } from "./user.service";
import bcrypt from 'bcryptjs';


const loginWithEmailAndPassword = async (email: string, password: string) => {
  // 1. verificar que existe el usuario
  const user = await userService.getUserByEmail(email);

  if (!user) {
    logger.error(email);
    throw new HttpError("User not found", 400);
  }

  // 2. comparar los hash de contraseña
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new HttpError("Password incorrect", 400);
  }

  // 3. generar el token
  const token = generateAccessToken(user.email, user.uid);

  return token;
};

const registerWithEmailAndPasswordAndName = async (
  email: string,
  password: string,
  name: string
) => {
  const newUser = await userService.createUserWithEmailAndPasswordAndName({
    email,
    password,
    name
  });

  const token = generateAccessToken(newUser.email, newUser.uid);

  return token;
};
export const authService = {
  loginWithEmailAndPassword,
  registerWithEmailAndPasswordAndName,
}
import { Request, Response } from 'express';
import { authService} from '../services/auth.service';

const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const token = await authService.registerWithEmailAndPasswordAndName(email, password, name);
    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authService.loginWithEmailAndPassword(email, password);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: 'An unknown error occurred' });
    }
  }
};

export const authController = {
  login,
  register,
};

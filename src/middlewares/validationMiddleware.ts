import { Request, Response, NextFunction } from 'express';
import { authValidationSchemas } from '../schemas/validationSchemas';

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { error } = authValidationSchemas.registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = authValidationSchemas.loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validationMiddleware = { validateRegister, validateLogin };
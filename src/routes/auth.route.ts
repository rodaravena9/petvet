import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validationMiddleware } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/login", validationMiddleware.validateLogin, authController.login);
router.post("/register", validationMiddleware.validateRegister, authController.register);

export default router;

import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

// Base path: http://localhost:3000/api/v1/users

// Leer todos los usuarios (protegida)
router.get("/", verifyToken, userController.getUsers);

// Leer un único usuario por id (protegida)
router.get("/:id", verifyToken, userController.getUser);

// Crear un usuario (pública)
router.post("/", userController.createUser);

// Eliminar un usuario por id (protegida)
router.delete("/:id", verifyToken, userController.deleteUser);

// Actualizar un usuario por id (protegida)
router.put("/:id", verifyToken, userController.updateUser);

export default router;

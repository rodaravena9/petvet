import { Router } from "express";
import { petController } from "../controllers/pet.controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

router.use(verifyToken);

//obtener todas las mascotas
router.get("/", petController.getAllPets);

// obtener una mascota por su Id
router.get("/:id", petController.getPetById);

//obtener mascotas de un usuario autenticado
router.get("/user", petController.getPetsByUserId);

//crear una nueva mascota
router.post("/", petController.createPet);

//actualizar una mascota por id
router.put("/:id", petController.updatePet);

//eliminar una mascota por id
router.delete("/:id", petController.deletePet);

export default router;
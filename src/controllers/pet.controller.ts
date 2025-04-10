import { NextFunction, Request, Response } from "express";
import { PetService } from "../services/pet.service";
import { HttpError } from "../utils/httpError.util";

// Obtener todas las mascotas
const getAllPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pets = await PetService.findAllPets();
    res.status(200).json({ pets });
  } catch (error) {
    next(error);
  }
};

// Obtener una mascota por su ID
const getPetById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const pet = await PetService.findPetById(id);

    if (!pet) {
      throw new HttpError("Pet not found", 404);
    }

    res.status(200).json({ pet });
  } catch (error) {
    next(error);
  }
};

// Obtener mascotas por el ID del usuario
const getPetsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req;

    if (!uid) {
      throw new HttpError("No token provided", 401);
    }

    const pets = await PetService.findPetByUserId(uid);
    res.status(200).json({ pets });
  } catch (error) {
    next(error);
  }
};

// Crear una nueva mascota
const createPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, breed, age } = req.body;
    const { uid } = req;

    if (!uid) {
      throw new HttpError("No token provided", 401);
    }

    const newPet = await PetService.createPet(uid, name, breed, age);
    res.status(201).json({ newPet });
  } catch (error) {
    next(error);
  }
};

// Actualizar una mascota por su ID
const updatePet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, breed, age } = req.body;

    const updatedPet = await PetService.updatePet(id, name, breed, age);

    if (!updatedPet) {
      throw new HttpError("Pet not found", 404);
    }

    res.status(200).json({ updatedPet });
  } catch (error) {
    next(error);
  }
};

// Eliminar una mascota por su ID
const deletePet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deletedPet = await PetService.removePet(id);

    if (!deletedPet) {
      throw new HttpError("Pet not found", 404);
    }

    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const petController = {
  getAllPets,
  getPetById,
  getPetsByUserId,
  createPet,
  updatePet,
  deletePet,
};

import { Pet } from "../schemas/pet.schema"; // Ruta correcta según tu proyecto
import { User } from "../schemas/user.schema"; // Ruta correcta según tu proyecto

// Obtener todas las mascotas
const findAllPets = async (): Promise<Pet[]> => {
  return await Pet.findAll({
    include: [{ model: User }], // Incluye la relación con el usuario
  });
};

// Obtener mascota por ID
const findPetById = async (id: string): Promise<Pet | null> => {
  return await Pet.findByPk(id, {
    include: [{ model: User }], // Incluye la relación con el usuario
  });
};

// Obtener mascotas por dueño
const findPetByUserId = async (userId: string): Promise<Pet[]> => {
  return await Pet.findAll({
    where: { userId },
    include: [{ model: User }], // Incluye la relación con el usuario
  });
};

// Guardar nueva mascota
const createPet = async (userId: string, name: string, breed: string | null, age: number): Promise<Pet> => {
  return await Pet.create({
    userId,
    name,
    breed,
    age,
  });
};

// Actualizar mascota por ID
const updatePet = async (
  id: string,
  name: string,
  breed: string | null,
  age: number
): Promise<Pet | null> => {
  const pet = await Pet.findByPk(id);
  if (pet) {
    pet.name = name;
    pet.breed = breed;
    pet.age = age;
    await pet.save();
  }
  return pet;
};

// Eliminar mascota por ID
const removePet = async (id: string): Promise<Pet | null> => {
  const pet = await Pet.findByPk(id);
  if (pet) {
    await pet.destroy();
  }
  return pet;
};

export const PetService = {
  findAllPets,
  findPetById,
  findPetByUserId,
  createPet,
  updatePet,
  removePet,
};

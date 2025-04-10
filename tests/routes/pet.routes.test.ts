import supertest from "supertest";
import express from "express";
import { describe, it, expect } from "vitest";

const app = express();

// BD simulada
const pets = [
  { id: 1, name: "Fido", type: "dog" },
  { id: 2, name: "Whiskers", type: "cat" },
];

// obtener todas las mascotas
app.get("/pets", (req, res) => {
  res.status(200).json(pets);
});

// obtener una mascota por ID
app.get("/pets/:id", (req, res) => {
  const petId = parseInt(req.params.id, 10);
  const pet = pets.find((p) => p.id === petId);

  if (pet) {
    res.status(200).json(pet);
  } else {
    res.status(404).json({ error: "Pet not found" });
  }
});

// Tests
describe("Test pets routes", () => {
  const request = supertest(app);

  describe("GET /pets", () => {
    it("Must sendback code 200", async () => {
      const response = await request.get("/pets");
      expect(response.status).toBe(200);
    });

    it("Must sendback pet array", async () => {
      const response = await request.get("/pets");
      expect(response.body).toEqual(pets);
    });
  });

  describe("GET /pets/:id", () => {
    it("Must sendback code 200", async () => {
      const response = await request.get("/pets/1");
      expect(response.status).toBe(200);
    });

    it("Must sendback code 404 if pet doesn't exist", async () => {
      const response = await request.get("/pets/999");
      expect(response.status).toBe(404);
    });

  });
});

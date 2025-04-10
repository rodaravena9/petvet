import { Sequelize } from "sequelize-typescript";
import { User } from "../schemas/user.schema";
import { Pet } from "../schemas/pet.schema";

const DATABASE_URL = "postgres://postgres:root@localhost:5434/dbpets";

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  models: [User, Pet],
  // logging: false, // disable logging
});


import { Request, Response } from "express";
import { userService } from "../services/user.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(error instanceof Error ? 500 : 500).json({
      error: error instanceof Error ? error.message : "Server error",
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(error instanceof Error ? 404 : 500).json({
      error: error instanceof Error ? error.message : "Server error",
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const newUser = await userService.createUserWithEmailAndPasswordAndName({
      email,
      password,
      name
    });

    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    res.status(error instanceof Error && error.message.includes("exists") ? 400 : 500).json({
      error: error instanceof Error ? error.message : "Server error",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await userService.updateUserById(id, updates);

    res.json({ updatedUser });
  } catch (error) {
    console.error(error);
    res.status(error instanceof Error ? 404 : 500).json({
      error: error instanceof Error ? error.message : "Server error",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await userService.deleteUserById(id);

    res.json({ deletedUser });
  } catch (error) {
    console.error(error);
    res.status(error instanceof Error ? 404 : 500).json({
      error: error instanceof Error ? error.message : "Server error",
    });
  }
};

export const userController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
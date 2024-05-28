import { Router } from "express";

import UserRepository from "../repositories/UserRepository.js";
import UserService from "../services/UserService.js";
import UserController from "../controllers/UserController.js";

const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.get("", userController.listUsers);
userRoutes.post("", userController.createUser);
userRoutes.put("/:email", userController.updateUser);
userRoutes.delete("/:email", userController.deleteUser);

userRoutes.get("/:email", userController.findUserByEmail);

export default userRoutes;

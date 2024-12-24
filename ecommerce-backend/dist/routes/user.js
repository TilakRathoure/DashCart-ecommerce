import express from "express";
import { deleteUser, getAllUsers, newUser } from "../controllers/user.js";
const user = express.Router();
user.post("/new", newUser);
user.get("/all", getAllUsers);
user.delete("/:id", deleteUser);
export default user;

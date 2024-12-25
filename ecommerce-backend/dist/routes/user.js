import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { authentication } from "../middlewares/authentication.js";
const user = express.Router();
user.post("/new", newUser);
user.get("/all", authentication, getAllUsers);
user.delete("/:id", authentication, deleteUser);
user.get("/:id", authentication, getUser);
export default user;

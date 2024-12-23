import express from "express"
import { newUser } from "../controllers/user.js";

const user= express.Router();

user.post("/user",newUser);

export default user;


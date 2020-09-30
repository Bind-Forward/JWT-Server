import express from "express";
import { registerUser, loginUSer, isVerified } from "../utils/helper.js";
import validInfo from "../middleware/validInfo.js";
import authorization from "../middleware/authorization.js";

export const router = express.Router();

// POST
router.post("/register", validInfo, registerUser);
router.post("/login", validInfo, loginUSer);

//GET
router.get("/is-verify", authorization, isVerified);

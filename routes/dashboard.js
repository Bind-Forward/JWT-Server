import express from "express";
import { query } from "../db.js";
import authorization from "../middleware/authorization.js";
export const router = express.Router();

router.get("/", authorization, async (req, res) => {
  try {
    const user = await query("SELECT user_name FROM users WHERE user_id = $1", [
      req.user,
    ]);
    res.json(user.rows);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
});

import { query } from "../db.js";
import bcrypt from "bcrypt";

export const checkIfUserExists = async (user_email) => {
  const user = await query("SELECT * FROM users WHERE user_email = $1", [
    user_email,
  ]);

  return user;
};

export const cryptUserPassword = async (user_password) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  let pwd;
  await bcrypt.hash(user_password, salt).then((p) => {
    pwd = p;
  });

  return pwd;
};

export const insertCryptedUserIntoDB = async (
  user_name,
  user_email,
  crypted_password
) => {
  try {
    const newUser = await query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [user_name, user_email, crypted_password]
    );

    return newUser;
  } catch (err) {
    res.send(err.message);
  }
};

export const decryptPassword = async (user_password, password_from_db) => {
  const val = await bcrypt.compare(user_password, password_from_db);

  return val
};

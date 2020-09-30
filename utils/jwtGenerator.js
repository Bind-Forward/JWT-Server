import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const jwtGenerator = (user_id) => {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: 60 * 60 * 24
  });
};

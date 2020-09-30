import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authorization = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      res.status(403).send({
        message: "You are not authorized",
      });
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;

    next();
  } catch (err) {
    res.status(403).send({
      message: "You are not authorized",
    });
  }
};

export default authorization;

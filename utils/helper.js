import { jwtGenerator } from "./jwtGenerator.js";
import {
  checkIfUserExists,
  cryptUserPassword,
  insertCryptedUserIntoDB,
  decryptPassword,
} from "./helper2.js";

export const registerUser = async (req, res) => {
  const { user_name, user_email, user_password } = req.body;

  try {
    // check if user exists, if so, throw an error
    checkIfUserExists(user_email).then((user) => {
      // if user doesn't exist
      if (user.rows.length === 0) {
        // Bcrypt user_password
        cryptUserPassword(user_password).then((cryptedPassword) => {
          // Insert new user inside db with bcrypted pwd
          insertCryptedUserIntoDB(user_name, user_email, cryptedPassword).then(
            (response) => {
              // Generating out jwt token
              res.send({ token: jwtGenerator(response.rows[0].user_id) });
            }
          );
        });
      } else {
        res.status(501).send({ message: "user already exists in the db" });
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const loginUSer = async (req, res) => {
  const { user_email, user_password } = req.body;
  try {
    // Check if user exists, if not, throw error
    checkIfUserExists(user_email).then((user) => {
      if (user.rows.length === 0) {
        res.status(401).send({ message: "Password or Email is incorrect" });
      }

      // check if incoming password is the same as the one in the db
      decryptPassword(user_password, user.rows[0].user_password).then(
        (correctPassword) => {
          if (!correctPassword) { // if password is wrong
            res.status(401).send({ message: "Password or Email is incorrect" });
          } else {
            // give jwt token
            res.json({ token: jwtGenerator(user.rows[0].user_id) });
          }
        }
      );
    });
  } catch (err) {
    res.status(501).send(err.message);
  }
};

// checks the token from header
export const isVerified = async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.status(500).send({ message: "Server Error " + err.message });
  }
};

const express = require("express");
const router = express.Router();

let { check, validationResult } = require("express-validator");

const {
   signout,
   createUser,
   signin,
   getUserById,
   getUser,
   getAllUser,
   updateUser,
   deleteUser,
   googleLogin,
} = require("../controllers/auth");

//Get Parameter of user
router.param("userId", getUserById);

//Create user Route
router.post(
   "/create/users",
   [
      check("email", "Email is Required").isEmail(),
      check("password", "Password Should be at least 5 Char").isLength({
         min: 5,
      }),
   ],
   createUser
);

//Read User Route
router.get("/get/users/:userId", getUser);
router.get("/users", getAllUser);

//Update User Route
router.put("/edit/users/:userId", updateUser);

//Delete User Route
router.delete("/delete/users/:userId", deleteUser);

//Create signin Route
router.post(
   "/signin",
   [
      check("email", "Email is Required").isEmail(),
      check("password", "Password field is required").isLength({ min: 5 }),
   ],
   signin
);

//Create Signout Route
router.get("/signout", signout);

//LogIn With Google
router.post("/googlelogin", googleLogin);

module.exports = router;

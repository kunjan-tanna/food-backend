const express = require("express");
const router = express.Router();
let { check } = require("express-validator");

const {
   signout,
   createUser,
   forgotPassword,
   resetPassword,
   signin,
   isSignedIn,
   getUserById,
   getUser,
   getAllUser,
   updateUser,
   deleteUser,
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

//Create signin Route
router.post(
   "/signin",
   [
      check("email", "Email is Required").isEmail(),
      check("password", "Password field is required").isLength({ min: 5 }),
   ],
   signin
);

//Update User Route
router.put("/edit/users/:userId", updateUser);
//Create Signout Route
router.get("/signout", signout);

//Get Users
router.get("/users", getAllUser);
router.get("/get/users/:userId", getUser);

//Test Routes
router.get("/test", (req, res) => {
   res.send("Hello");
});

module.exports = router;

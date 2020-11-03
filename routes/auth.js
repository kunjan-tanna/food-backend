const express = require("express");
const router = express.Router();
let { check } = require("express-validator");
const multer = require("multer");

let storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "./public/upload");
   },
   filename: (req, file, cb) => {
      let filetype = "";
      if (file.mimetype === "image/gif") {
         filetype = "gif";
      }
      if (file.mimetype === "image/png") {
         filetype = "png";
      }
      if (file.mimetype === "image/jpeg") {
         filetype = "jpg";
      }
      cb(null, "image-" + Date.now() + "." + filetype);
   },
});
let upload = multer({ storage: storage });

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
   upload.single("avtar"),
   createUser
);
//Forgot Password Route
router.put("/forgotpassword", forgotPassword);

//Reset Password Route
router.put("/resetpassword", resetPassword);

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

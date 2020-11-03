const User = require("../models/auth");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const _ = require("lodash");
let expressJwt = require("express-jwt");

//Nodemailer Email
const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: "noreplykjn@gmail.com",
      pass: "noreply@2628",
   },
});

// Get Id of User in controller
exports.getUserById = async (req, res, next, id) => {
   try {
      await User.findById(id).exec((err, user) => {
         if (err) {
            return res.status(400).json({
               error: "User not found",
            });
         }
         req.user = user;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

// Create User Data
exports.createUser = async (req, res) => {
   try {
      const user = await new User(req.body);
      user.avtar = req.file.filename;

      user.save((err, user) => {
         console.log(user);
         if (err) {
            return res.status(400).json({
               error: "User not able to save",
            });
         }
         return res.json(user);
      });
   } catch (error) {
      console.log(error);
   }
};
//Get User Information
exports.getUser = (req, res) => {
   // console.log("USEEERR", req.user);
   try {
      req.user.createdAt = undefined;
      req.user.updatedAt = undefined;
      return res.json(req.user);
   } catch (error) {
      console.log(error);
   }
};

//Get All User Information
exports.getAllUser = async (req, res) => {
   try {
      await User.find().exec((err, user) => {
         if (err) {
            return res.status(400).json({
               error: "No user found",
            });
         }
         return res.json(user);
      });
   } catch (error) {
      console.log(error);
   }
};

//Create Signin for user
exports.signin = (req, res) => {
   try {
      const errors = validationResult(req);
      const { email, password } = req.body;

      if (!errors.isEmpty()) {
         return res.status(422).json({
            error: errors.array()[0].msg,
         });
      }

      User.findOne({ email }, (err, user) => {
         if (err || !user) {
            return res.status(400).json({
               error: "User email does not exist",
            });
         }

         if (!user.authenticate(password)) {
            return res.status(401).json({
               error: "Email and password do not match",
            });
         }

         const token = jwt.sign({ _id: user._id }, process.env.SECRET);
         res.cookie("token", token, {
            expire: new Date() + 9999,
         });

         const {
            _id,
            firstName,
            lastName,
            email,
            address,
            avtar,
            mobile,
            roleId,
         } = user;
         return res.json({
            token,
            user: {
               _id,
               firstName,
               lastName,
               email,
               address,
               mobile,
               avtar,
               roleId,
            },
         });
      });
   } catch (error) {
      console.log(error);
   }
};
//Forgot Password for user
exports.forgotPassword = (req, res) => {
   try {
      const { email } = req.body;
      User.findOne({ email }, (err, user) => {
         // console.log("USERS", user);
         if (err || !user) {
            return res.status(400).json({
               error: "User email does not exists",
            });
         }

         let token = jwt.sign(
            { _id: user._id },
            process.env.RESET_PASSWORD_KEY
         );
         const data = {
            from: "noreplykjn@gmail.com",
            to: email,
            subject: "Password Reset Link",
            html: `<h2> Please Click on given link to reset your password</h2>
                  <p>
                   <a href="${process.env.CLIENT_URL}/resetpassword?resetLink=${token}">Click Here</a>
                  </p> `,
         };
         return user.updateOne({ resetLink: token }, (err, success) => {
            if (err) {
               return res.status(400).json({
                  error: "Reset Password Link Error",
               });
            } else {
               transporter.sendMail(data, (err, body) => {
                  if (err) {
                     return res.json({
                        error: err.message,
                     });
                  }
                  return res.json({
                     message:
                        "Email has been sent, kindly Follow the instruction",
                  });
               });
            }
         });
      });
   } catch (error) {
      console.log(error);
   }
};
//Reset Password for user
exports.resetPassword = (req, res) => {
   const { resetLink, newPass } = req.body;
   if (resetLink) {
      jwt.verify(
         resetLink,
         process.env.RESET_PASSWORD_KEY,
         (error, decodedData) => {
            console.log(resetLink);
            if (error) {
               return res.status(401).json({
                  error: "Incorrect Token Or Id Is Expired",
               });
            }
            User.findOne({ resetLink }, (err, user) => {
               console.log("USER", user);
               if (err || !user) {
                  return res.status(400).json({
                     error: "User with reset link does not exist",
                  });
               }
               let obj = {
                  password: newPass,
                  resetLink: "",
               };
               user = _.extend(user, obj);
               user.save((err, result) => {
                  if (error) {
                     return res.status(400).json({
                        error: "Reset Password Error",
                     });
                  } else {
                     return res.status(200).json({
                        message: "Your Password Has Been Changed",
                     });
                  }
               });
            });
         }
      );
   } else {
      return res.status(400).json({
         error: "Authentication Error!",
      });
   }
};
//Perform Logout
exports.signout = (req, res) => {
   res.clearCookie("token");
   res.json({
      message: "User signout",
   });
};
//Protected Routes
exports.issignIn = expressJwt({
   secret: process.env.SECRET,
   userProperty: "auth",
   algorithms: ["HS256"],
});

//Update User Data
exports.updateUser = async (req, res) => {
   try {
      const user = await req.user;
      user._id = req.body.userId;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.address = req.body.address;
      user.mobile = req.body.mobile;
      user.ownerOf = req.body.ownerOf;
      user.status = req.body.status;

      user.save((err, user) => {
         if (err) {
            return res.status(400).json({
               error: "User not able to update",
            });
         }
         user.salt = undefined;
         user.encry_password = undefined;
         user.createdAt = undefined;
         user.updatedAt = undefined;
         console.log("Updated User", user);
         res.json({ user });
      });
   } catch (error) {
      console.log(error);
   }
};

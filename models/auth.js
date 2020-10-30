const mongoose = require("mongoose");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const { v1: uuidv1 } = require("uuid");

const userSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: true,
         trim: true,
      },

      lastName: {
         type: String,
         required: true,
         trim: true,
      },
      email: {
         type: String,
         trim: true,
         required: true,
         unique: true,
      },
      encry_password: {
         type: String,
         trim: true,
      },
      resetLink: {
         type: String,
         default: "",
      },
      status: {
         type: String,
         default: "active",
         enum: ["active", "InActive", "deleted"],
      },
      avtar: {
         type: String,
         default: null,
      },
      address: {
         type: String,
         default: null,
      },
      mobile: {
         type: String,
         trim: true,
         required: true,
      },
      role: {
         type: String,
         default: "teacher",
         enum: ["teacher", "admin"],
      },
      salt: String,
   },
   { timestamps: true }
);

userSchema
   .virtual("password")
   .set(function (password) {
      this._password = password;
      this.salt = uuidv1();
      this.encry_password = this.securePassword(password);
   })
   .get(function () {
      return this._password;
   });

userSchema.methods = {
   authenticate: function (plainPassword) {
      return this.securePassword(plainPassword) === this.encry_password;
   },
   securePassword: function (plainPassword) {
      if (!plainPassword) return "";
      try {
         return crypto
            .createHmac("sha256", this.salt)
            .update(plainPassword)
            .digest("hex");
      } catch (err) {
         return "";
      }
   },
};

module.exports = mongoose.model("User", userSchema);

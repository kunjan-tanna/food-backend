const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
      },
      firstName: {
         type: String,
         trim: true,
      },
      lastName: {
         type: String,
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
         required: true,
         trim: true,
      },
      pinCode: {
         type: String,
      },
      address: {
         type: String,
      },
      mobile: {
         type: String,
         trim: true,
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

const Role = require("../models/role");
const mongoose = require("mongoose");

// Get Id of role in controller
exports.getroleById = (req, res, next, id) => {
   try {
      Role.findById(id).exec((err, role) => {
         if (err) {
            return res.status(400).json({
               error: "role not found",
            });
         }
         req.role = role;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Create role data in DB
exports.createrole = (req, res) => {
   try {
      const role = new Role(req.body);
      role.save((err, client) => {
         if (err) {
            return res.status(400).json({
               error: "role not able to save.",
            });
         }
         res.json({ client });
      });
   } catch (error) {
      console.log(error);
   }
};

//Get role Data
exports.getrole = (req, res) => {
   try {
      return res.json(req.role);
   } catch (error) {
      console.log(error);
   }
};

//Get All role Data
exports.getAllrole = (req, res) => {
   try {
      Role.find().exec((err, role) => {
         if (err) {
            return res.status(400).json({
               error: "No role found",
            });
         }
         res.json(role);
      });
   } catch (error) {
      console.log(error);
   }
};

//Update role Data
exports.updaterole = async (req, res) => {
   try {
      let client = await Role.findOne({
         _id: mongoose.Types.ObjectId(req.body.roleId),
      });
      if (!client) {
         return res.send("Something Went wrong");
      } else {
         let editrole = await Role.updateMany(
            { _id: req.body.roleId },
            {
               roleName: req.body.roleName,
               status: req.body.status,
            }
         );
         if (editrole.nModified > 0) {
            let client = await Role.findOne({
               _id: mongoose.Types.ObjectId(req.body.roleId),
            });
            return res.json({ client });
         }
      }
   } catch (error) {
      console.log(error);
   }
};

//Delete role Data
exports.deleterole = (req, res) => {
   try {
      let role = req.role;
      Role.deleteOne(role, (err, role) => {
         if (err) {
            return res.status(400).json({
               error: "No role found",
            });
         }
         res.send("role details deleted successfully");
      });
   } catch (error) {
      console.log(error);
   }
};

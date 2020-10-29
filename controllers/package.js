const Package = require("../models/package");
const mongoose = require("mongoose");

// Get Id of Package in controller
exports.getPackageById = (req, res, next, id) => {
   try {
      Package.findById(id).exec((err, package) => {
         if (err) {
            return res.status(400).json({
               error: "Package not found",
            });
         }
         req.package = package;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Create Package data in DB
exports.createPackage = (req, res) => {
   try {
      const package = new Package(req.body);
      package.save((err, client) => {
         if (err) {
            return res.status(400).json({
               error: "package not able to save.",
            });
         }
         res.json({ client });
      });
   } catch (error) {
      console.log(error);
   }
};

//Get Package Data
exports.getPackage = (req, res) => {
   try {
      return res.json(req.package);
   } catch (error) {
      console.log(error);
   }
};

//Get All Package Data
exports.getAllPackage = (req, res) => {
   try {
      Package.find().exec((err, package) => {
         if (err) {
            return res.status(400).json({
               error: "No package found",
            });
         }
         res.json(package);
      });
   } catch (error) {
      console.log(error);
   }
};

//Update Package Data
exports.updatePackage = async (req, res) => {
   try {
      let client = await Package.findOne({
         _id: mongoose.Types.ObjectId(req.body.packageId),
      });
      if (!client) {
         return res.send("Something Went wrong");
      } else {
         let editPackage = await Package.updateMany(
            { _id: req.body.packageId },
            {
               packageName: req.body.packageName,
               status: req.body.status,
            }
         );
         if (editPackage.nModified > 0) {
            let client = await Package.findOne({
               _id: mongoose.Types.ObjectId(req.body.packageId),
            });
            return res.json({ client });
         }
      }
   } catch (error) {
      console.log(error);
   }
};

//Delete Package Data
exports.deletePackage = (req, res) => {
   try {
      let category = req.package;
      Package.deleteOne(category, (err, package) => {
         if (err) {
            return res.status(400).json({
               error: "No Package found",
            });
         }
         res.send("Package details deleted successfully");
      });
   } catch (error) {
      console.log(error);
   }
};

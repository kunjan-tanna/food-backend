const PackageType = require("../models/packageType");
const mongoose = require("mongoose");

// Get Id of PackageType in controller
exports.getPackageTypeById = (req, res, next, id) => {
   try {
      PackageType.findById(id).exec((err, packageType) => {
         if (err) {
            return res.status(400).json({
               error: "PackageType not found",
            });
         }
         req.packageType = packageType;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Create PackageType data in DB
exports.createPackageType = (req, res) => {
   try {
      const packaget = new PackageType(req.body);
      packaget.save((err, client) => {
         if (err) {
            return res.status(400).json({
               error: "packageType not able to save.",
            });
         }
         res.json({ client });
      });
   } catch (error) {
      console.log(error);
   }
};

//Get PackageType Data
exports.getPackageType = (req, res) => {
   try {
      return res.json(req.packageType);
   } catch (error) {
      console.log(error);
   }
};

//Get All Packagetype Data
exports.getAllPackageType = (req, res) => {
   try {
      PackageType.find().exec((err, packaget) => {
         if (err) {
            return res.status(400).json({
               error: "No packageType found",
            });
         }
         res.json(packaget);
      });
   } catch (error) {
      console.log(error);
   }
};

//Update PackageType Data
exports.updatePackageType = async (req, res) => {
   try {
      let client = await PackageType.findOne({
         _id: mongoose.Types.ObjectId(req.body.packageTypeId),
      });
      if (!client) {
         return res.send("Something Went wrong");
      } else {
         let editPackaget = await PackageType.updateMany(
            { _id: req.body.packageTypeId },
            {
               packageTypeName: req.body.packageTypeName,
               status: req.body.status,
            }
         );
         if (editPackaget.nModified > 0) {
            let client = await PackageType.findOne({
               _id: mongoose.Types.ObjectId(req.body.packageTypeId),
            });
            return res.json({ client });
         }
      }
   } catch (error) {
      console.log(error);
   }
};

//Delete PackageType Data
exports.deletePackageType = (req, res) => {
   try {
      let pkgt = req.packageType;
      PackageType.deleteOne(pkgt, (err, package) => {
         if (err) {
            return res.status(400).json({
               error: "No PackageType found",
            });
         }
         res.send("PackageType details deleted successfully");
      });
   } catch (error) {
      console.log(error);
   }
};

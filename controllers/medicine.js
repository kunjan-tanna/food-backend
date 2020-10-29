const Medicine = require("../models/medicine");
const mongoose = require("mongoose");
// Get Id of Medicine in controller
exports.getMedicineById = (req, res, next, id) => {
   try {
      Medicine.findById(id).exec((err, medicine) => {
         if (err) {
            return res.status(400).json({
               error: "Medicine data not found",
            });
         }
         req.medicine = medicine;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Store Medicine Data in Lead Collection
exports.createMedicine = async (req, res) => {
   try {
      const medicine = new Medicine(req.body);

      medicine.save((err, client) => {
         if (err) {
            return res.status(400).json({
               error: "Medicine not able to save.",
            });
         }
         return res.json({ client });
      });
   } catch (error) {
      console.log(error);
   }
};

//get Medicine data
exports.getMedicine = (req, res) => {
   try {
      return res.json(req.medicine);
   } catch (error) {
      console.log(error);
   }
};

//get All Medicine Data
exports.getAllMedicine = (req, res) => {
   try {
      Medicine.find()
         //To Join one or more tables uaing aggregate fn()
         /* Medicine.aggregate([
         {
            $lookup: {
               from: "packages",
               localField: "packageId",
               foreignField: "_id",
               as: "packageDetails",
            },
         },
         {
            $lookup: {
               from: "categories",
               localField: "categoryId",
               foreignField: "_id",
               as: "categoryDetails",
            },
         },
         {
            $lookup: {
               from: "racks",
               localField: "rackId",
               foreignField: "_id",
               as: "rackDetails",
            },
         },
      ]) */
         .populate("categoryId packageId packageTypeId")
         .exec((err, medicine) => {
            if (err) {
               return res.status(400).json({
                  error: "No Medicine found",
               });
            } else {
               return res.json(medicine);
            }
         });
   } catch (error) {
      console.log(error);
   }
};
//get Updated medicine
exports.getupdateMedicine = (req, res) => {
   try {
      // console.log("sale id", res);
      Medicine.find({
         saleQuantity: { $gt: 0 },
      })
         .populate("packageId")
         .exec((err, medicine) => {

            if (err) {
               return res.status(400).json({
                  error: "No updated Medicine found",
               });
            } else {
               return res.json(medicine);
            }
         });
   } catch (error) {
      console.log(error);
   }
};
//Update medicine data
exports.updateMedicine = async (req, res) => {
   try {
      let medicine = await Medicine.findOne({
         _id: mongoose.Types.ObjectId(req.body.medicineId),
      });
      if (!medicine) {
         return res.send("Something Went wrong");
      } else {
         let editmedicine = await Medicine.updateMany(
            { _id: req.body.medicineId },
            {
               saleQuantity: req.body.saleQuantity,
               price: req.body.price,
               quantity: req.body.quantity,

               totalNoOfItem: req.body.totalNoOfItem,
            }
         );
         if (editmedicine.nModified > 0) {
            let medicine = await Medicine.findOne({
               _id: mongoose.Types.ObjectId(req.body.medicineId),
            });
            return res.json(medicine);
         }
      }
   } catch (error) {
      console.log(error);
   }
};
// //Update Medicine Data
// exports.updateMedicine = async (req, res) => {
//    try {
//       const editMedicine = await req.medicine
//       editMedicine._id = req.body.medicineId;
//       editMedicine.productName = req.body.productName;
//       editMedicine.categoryId = req.body.categoryId;
//       editMedicine.packageId = req.body.packageId;
//       editMedicine.packageTypeId = req.body.packageTypeId;
//       editMedicine.noOfSubItemPack = req.body.noOfSubItemPack;
//       editMedicine.itemUnitCost = req.body.itemUnitCost;
//       editMedicine.subItemUnitCost = req.body.subItemUnitCost;
//       editMedicine.userId = req.body.userId;
//       editMedicine.purchaseRate = req.body.purchaseRate;
//       editMedicine.MRPRate = req.body.MRPRate;
//       editMedicine.saleRate = req.body.saleRate;
//       editMedicine.noOfItemPack = req.body.noOfItemPack;
//       editMedicine.quantity = req.body.quantity;
//       editMedicine.totalNoOfItem = req.body.totalNoOfItem;
//       editMedicine.totalNoOfQuantity = req.body.totalNoOfQuantity;
//       editMedicine.status = req.body.status;
//       console.log("MEDICINE", editMedicine);
//       editMedicine.save((err, medicine) => {
//          if (err) {
//             return res.status(400).json({
//                error: "medicine data not updated",
//             });
//          }
//          res.json({ medicine });
//       });
//    } catch (error) {
//       console.log(error);
//    }
// };

//Delete Medicine Data
exports.deleteMedicine = (req, res) => {
   try {
      let medicine = req.medicine;
      Medicine.deleteOne(medicine, (err, medicine) => {
         if (err) {
            return res.status(400).json({
               error: "No Medicine found",
            });
         }
         return res.send("Medicine details deleted successfully");
      });
   } catch (error) {
      console.log(error);
   }
};

const Purchase = require("../models/purchase");
const Medicine = require("../models/medicine");
const slug = require("slug");
const mongoose = require("mongoose");
const medicine = require("../models/medicine");

// Get Id of purchase in controller
exports.getPurchaseById = (req, res, next, id) => {
   try {
      Purchase.findById(id).exec((err, purchase) => {
         if (err) {
            return res.status(400).json({
               error: "purchase data not found",
            });
         }
         req.purchase = purchase;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Store purchase Data in Lead Collection
exports.createPurchase = (req, res) => {
   try {
      const purchase = new Purchase(req.body);

      if (purchase !== 0) {
         // Medicine.findByIdAndUpdate(purchase.medicineId, {
         //    $inc: {
         //       quantity: purchase.purchaseQuantity,
         //    },
         // }).exec((err, response) => {
         //    if (err) {
         //       return res.status(422).json({
         //          error: "No Update Found",
         //       });
         //    }
         // });
         Medicine.findById(purchase.medicineId).exec((err, medicine) => {
            // console.log("MEDICINE DAAA", medicine.quantity);
            if (err) {
               return res.status(400).json({
                  error: "Medicine data not found",
               });
            }
            req.medicine = medicine;
            const quan = req.medicine.quantity + purchase.purchaseQuantity;
            // console.log("Quantity", quan);
            const abc = req.medicine.noOfItemPack * quan;
            const xyz = abc * req.medicine.noOfSubItemPack;

            const editMedicine = req.medicine;
            editMedicine._id = purchase.medicineId;
            editMedicine.quantity = quan;
            editMedicine.totalNoOfItem = abc;
            editMedicine.totalNoOfQuantity = xyz;
            editMedicine.save((err, m) => {
               // console.log("medicinwewewe", m);
               if (err) {
                  return res.status(400).json({
                     error: "Medicine data not updated",
                  });
               }
               //  res.json({category})
            });
         });

         purchase.save((err, client) => {
            if (err) {
               return res.status(400).json({
                  error: "purchase not able to save.",
               });
            }
            return res.json({ client });
         });
      }
   } catch (error) {
      console.log(error);
   }
};

//get purchase data
exports.getPurchase = (req, res) => {
   try {
      return res.json(req.purchase);
   } catch (error) {
      console.log(error);
   }
};

//get All purchase Data
exports.getAllPurchase = (req, res) => {
   try {
      Purchase.find()
         .populate("productId companyId paymentId userId")
         .exec((err, purchase) => {
            if (err) {
               return res.status(400).json({
                  error: "No purchase found",
               });
            }
            return res.json(purchase);
         });
   } catch (error) {
      console.log(error);
   }
};

//Update purchase Data
exports.updatePurchase = async (req, res) => {
   try {
      let purchase = await Purchase.findOne({
         _id: mongoose.Types.ObjectId(req.body.purchaseId),
      });
      if (!purchase) {
         return res.send("Something Went wrong");
      } else {
         let editpurchase = await Purchase.updateMany(
            { _id: req.body.purchaseId },
            {
               total: req.body.total,
               discount: req.body.discount,
               remarks: req.body.remarks,
               status: req.body.status,
            }
         );
         if (editpurchase.nModified > 0) {
            let purchase = await Purchase.findOne({
               _id: mongoose.Types.ObjectId(req.body.purchaseId),
            });
            return res.json({ purchase });
         }
      }
   } catch (error) {
      console.log(error);
   }
};

//Delete purchase Data
exports.deletePurchase = (req, res) => {
   try {
      let purchase = req.purchase;
      Purchase.deleteOne(purchase, (err, purchase) => {
         if (err) {
            return res.status(400).json({
               error: "No purchase found",
            });
         }
         return res.send("purchase details deleted successfully");
      });
   } catch (error) {
      console.log(error);
   }
};

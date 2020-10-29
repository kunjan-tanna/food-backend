const Sale = require("../models/sale");
const Customer = require("../models/customer");
const mongoose = require("mongoose");

// Get Id of sale in controller
exports.getsaleById = (req, res, next, id) => {
   try {
      Sale.aggregate([
         {
            $lookup: {
               from: "customers",
               localField: "customerId",
               foreignField: "_id",
               as: "customerDetails",
            },
         },
         {
            $lookup: {
               from: "payments",
               localField: "paymentId",
               foreignField: "_id",
               as: "paymentDetails",
            },
         },
         {
            $match: {
               _id: mongoose.Types.ObjectId(id),
            },
         },
      ]).exec((err, sale) => {
         // console.log("SAle DAtA", sale);
         if (err) {
            return res.status(400).json({
               error: "sale data not found",
            });
         }
         req.sale = sale;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Store sale Data in Lead Collection
exports.createsale = async (req, res) => {
   try {
      const ObjectId = await mongoose.Types.ObjectId;
      let array = [];
      let arr = [];
      req.body.customerId.map((cusItem) => {
         console.log("CUSTOMODEELL", cusItem);
         if (!ObjectId.isValid(cusItem)) {
            const customer = new Customer({ customerName: cusItem });

            customer.save((err, cusModel) => {
               if (err) {
                  return res.status(400).json({
                     error: "customer not able to save",
                  });
               } else {
                  return array.push(cusModel._id.toString());
               }
            });
         } else {
            return array.push(cusItem);
         }
      });

      setTimeout(() => {
         const sale = new Sale(req.body);

         sale.customerId = array;
         sale.save((err, client) => {
            if (err) {
               return res.status(400).json({
                  error: "sale not able to save.",
               });
            }
            return res.json(client);
         });
      }, 2000);
   } catch (error) {
      console.log(error);
   }
};

//get sale data
exports.getsale = (req, res, id) => {
   try {
      return res.json(req.sale);
   } catch (error) {
      console.log(error);
   }
};

//get All sale Data
exports.getAllsale = (req, res) => {
   try {
      // Medicine.find()
      // const ObjectId = mongoose.Types.ObjectId
      //To Join one or more tables uaing aggregate fn()
      Sale.aggregate([
         {
            $lookup: {
               from: "customers",
               localField: "customerId",
               foreignField: "_id",
               as: "customerDetails",
            },
         },
         {
            $lookup: {
               from: "payments",
               localField: "paymentId",
               foreignField: "_id",
               as: "paymentDetails",
            },
         },
         {
            $lookup: {
               from: "medicines",
               localField: "medicineId",
               foreignField: "_id",
               as: "medicineDetails",
            },
         },
      ])
         .exec((err, sale) => {
            console.log(sale)
            if (err) {
               return res.status(400).json({
                  error: "No sale found",
               });
            }

            return res.json(sale);
         });
   } catch (error) {
      console.log(error);
   }
};

//Update sale Data
exports.updatesale = async (req, res) => {
   try {
      let sale = await Sale.findOne({
         _id: mongoose.Types.ObjectId(req.body.saleId),
      });
      if (!sale) {
         return res.send("Something Went wrong");
      } else {
         let editsale = await Sale.updateMany(
            { _id: req.body.saleId },
            {
               discount: req.body.discount,
               remarks: req.body.remarks,
               status: req.body.status,
            }
         );
         if (editsale.nModified > 0) {
            let sale = await Sale.findOne({
               _id: mongoose.Types.ObjectId(req.body.saleId),
            });
            return res.json({ sale });
         }
      }
   } catch (error) {
      console.log(error);
   }
};

//Delete Package Data
exports.deleteSale = (req, res, id) => {
   try {

      let category = req.sale;
      Sale.remove(category, (err, package) => {
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

const Banquet = require("../modules/banquet");
const mongoose = require("mongoose");

//Store Banquet data in DB
exports.createbanquet = (req, res) => {
   try {
      const banquet = new Banquet(req.body);
      banquet.avtar = req.file.filename;
      banquet.save((err, Banquet) => {
         if (err) {
            return res.status(400).json({
               error: "Banquet not found in DB",
            });
         }
         res.json({ Banquet });
      });
   } catch (error) {
      console.log(error);
   }
};

//Get All Banquet Data
exports.getAllbanquet = (req, res) => {
   try {
      Banquet.find().exec((err, banquet) => {
         console.log("ban", banquet);
         if (err) {
            return res.status(400).json({
               error: "No banquet found",
            });
         }
         res.json(banquet);
      });
   } catch (error) {
      console.log(error);
   }
};

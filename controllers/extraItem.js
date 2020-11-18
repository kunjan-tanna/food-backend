const Item = require("../modules/extraItem");
const mongoose = require("mongoose");

//Store item data in DB
exports.createitem = (req, res) => {
   try {
      const item = new Item(req.body);

      item.save((err, item) => {
         if (err) {
            return res.status(400).json({
               error: "item not found in DB",
            });
         }
         res.json({ item });
      });
   } catch (error) {
      console.log(error);
   }
};

//Get All item Data
exports.getAllitem = (req, res) => {
   try {
      Item.find().exec((err, item) => {
         if (err) {
            return res.status(400).json({
               error: "No item found",
            });
         }
         res.json(item);
      });
   } catch (error) {
      console.log(error);
   }
};

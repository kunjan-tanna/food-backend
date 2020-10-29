const Rack = require("../models/rack");
const mongoose = require("mongoose");

// Get Id of Rack in controller
exports.getRackById = (req, res, next, id) => {
   try {
      Rack.findById(id).exec((err, rack) => {
         if (err) {
            return res.status(400).json({
               error: "Rack not found",
            });
         }
         req.rack = rack;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Create Rack data in DB
exports.createRack = (req, res) => {
   try {
      const rack = new Rack(req.body);
      rack.save((err, client) => {
         if (err) {
            return res.status(400).json({
               error: "rack not able to save.",
            });
         }
         res.json({ client });
      });
   } catch (error) {
      console.log(error);
   }
};

//Get Rack Data
exports.getRack = (req, res) => {
   try {
      return res.json(req.rack);
   } catch (error) {
      console.log(error);
   }
};

//Get All Rack Data
exports.getAllRack = (req, res) => {
   try {
      Rack.find().exec((err, rack) => {
         if (err) {
            return res.status(400).json({
               error: "No rack found",
            });
         }
         res.json(rack);
      });
   } catch (error) {
      console.log(error);
   }
};

//Update Rack Data
exports.updateRack = async (req, res) => {
   try {
      let client = await Rack.findOne({
         _id: mongoose.Types.ObjectId(req.body.rackId),
      });
      if (!client) {
         return res.send("Something Went wrong");
      } else {
         let editRack = await Rack.updateMany(
            { _id: req.body.rackId },
            {
               rackName: req.body.rackName,
               status: req.body.status,
            }
         );
         if (editRack.nModified > 0) {
            let client = await Rack.findOne({
               _id: mongoose.Types.ObjectId(req.body.rackId),
            });
            return res.json({ client });
         }
      }
   } catch (error) {
      console.log(error);
   }
};

//Delete Rack Data
exports.deleteRack = (req, res) => {
   try {
      let rack = req.rack;
      Rack.deleteOne(rack, (err, rack) => {
         if (err) {
            return res.status(400).json({
               error: "No Rack found",
            });
         }
         res.json({ rack });
      });
   } catch (error) {
      console.log(error);
   }
};

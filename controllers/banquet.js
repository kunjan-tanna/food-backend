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
      // //To Join one or more tables uaing aggregate fn()
      Banquet.aggregate([
         {
            $lookup: {
               from: "locations",
               localField: "locationId",
               foreignField: "_id",
               as: "locationDetails",
            },
            $geoNear: {
               near: {
                  type: "Point",
                  coordinates: [
                     parseFloat(req.query.lng),
                     parseFloat(req.query.lat),
                  ],
               },
               includeLocs: "locations",
               maxDistance: 5000,
               spherical: true,
            },
            $match: {
               locationId: "5fa28c4034751d07c48a180f",
            },
         },
      ]).exec((err, banquet) => {
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

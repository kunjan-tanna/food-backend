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
      Banquet.aggregate([
         {
            $geoNear: {
               near: {
                  type: "Point",
                  coordinates: [
                     parseFloat(req.query.lng),
                     parseFloat(req.query.lat),
                  ],
               },
               distanceField: "dist.calculated",
               includeLocs: "dist.location",
               maxDistance: 5000,
               spherical: true,
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

//Get filtering banquet
exports.getGeobanquet = (req, res) => {
   try {
      //To Join one or more tables uaing aggregate fn()
      Banquet.aggregate([
         {
            $geoNear: {
               near: {
                  type: "Point",
                  coordinates: [
                     parseFloat(req.query.lng),
                     parseFloat(req.query.lat),
                  ],
               },
               distanceField: "dist.calculated",
               includeLocs: "dist.location",
               maxDistance: 5000,
               spherical: true,
            },
         },
      ]).exec((err, banquet) => {
         console.log("ban", req.query);
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

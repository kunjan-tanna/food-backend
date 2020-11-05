const GeoLocation = require("../modules/geolocation");

//Create Geolocation
exports.createGeolocation = async (req, res) => {
   try {
      const geo = await new GeoLocation(req.body);
      geo.save((err, geolocation) => {
         if (err) {
            return res.status(400).json({
               error: "geolocation not able to save",
            });
         }
         return res.json(geolocation);
      });
   } catch (error) {
      console.log(error);
   }
};

//Get All geolocation Data
exports.getAllGeolocation = (req, res) => {
   try {
      //To Join one or more tables uaing aggregate fn()
      GeoLocation.aggregate([
         {
            $lookup: {
               from: "banquets",
               localField: "banquetId",
               foreignField: "_id",
               as: "packageDetails",
            },
         },
      ]).exec((err, geolocation) => {
         if (err) {
            return res.status(400).json({
               error: "No geolocation Found",
            });
         }
         return res.json(geolocation);
      });
   } catch (error) {
      console.log(error);
   }
};

//Get filtering banquet
exports.getGeobanquet = (req, res) => {
   try {
      //To Join one or more tables uaing aggregate fn()
      GeoLocation.aggregate([
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

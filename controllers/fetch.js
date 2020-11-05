const Fetch = require("../modules/fetch");

//Create Demo
exports.create = async (req, res) => {
   try {
      const geo = await new Fetch(req.body);
      geo.save((err, Demo) => {
         if (err) {
            return res.status(400).json({
               error: "Demo not able to save",
            });
         }
         return res.json(Demo);
      });
   } catch (error) {
      console.log(error);
   }
};

//Get All geolocation Data
exports.getAll = (req, res) => {
   try {
      Fetch.aggregate([
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
      ]).exec((err, demo) => {
         if (err) {
            return res.status(400).json({
               error: "No demo Found",
            });
         }
         return res.json(demo);
      });
   } catch (error) {
      console.log(error);
   }
};

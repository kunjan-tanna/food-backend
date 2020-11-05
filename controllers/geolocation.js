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
exports.getAllGeolocation = async (req, res) => {
   try {
      await GeoLocation.find()
      .exec((err, geolocation) => {
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

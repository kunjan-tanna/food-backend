const Location = require("../modules/location");

//Create Location api
exports.createLocation = async (req, res) => {
   try {
      const geo = await new Location(req.body);
      geo.save((err, location) => {
         if (err) {
            return res.status(400).json({
               error: "location not able to save",
            });
         }
         return res.json(location);
      });
   } catch (error) {
      console.log(error);
   }
};

//Get All location Data api
exports.getAllLocation = async (req, res) => {
   try {
      await Location.find({
         location: {
            $near: {
               $maxDistance: 80000,
               $geometry: {
                  type: "Point",
                  coordinates: [
                     parseFloat(req.query.lng),
                     parseFloat(req.query.lat),
                  ],
               },
            },
         },
      })
         .populate("banquetId")
         .exec((err, location) => {
            if (err) {
               return res.status(400).json({
                  error: "No location Found",
               });
            }
            return res.json(location);
         });
   } catch (error) {
      console.log(error);
   }
};

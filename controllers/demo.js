const Demo = require("../modules/demo");

//Create Demo
exports.createDemo = async (req, res) => {
   try {
      const geo = await new Demo(req.body);
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
exports.getAllDemo = async(req, res) => {
   try {
     await Demo.find({
         location: {
           $near: {
             $maxDistance: 5000,
             $geometry: {
               type: "Point",
               coordinates:  [
                  parseFloat(req.query.lng),
                  parseFloat(req.query.lat),
               ],
             }
           }
         }
      })
     .exec((err, demo) => {
         if (err) {
            return res.status(400).json({
               error: "No demo Found",
            });
         }
         return res.json(demo);
      })
   } catch (error) {
      console.log(error);
   }
};

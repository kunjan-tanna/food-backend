const mongoose = require("mongoose");

//Create Geolocation Schema
const geoSchema = new mongoose.Schema({
   type: {
      type: String,
      default: "Point",
   },
   coordinates: {
      type: [Number],
   },
});
//Create Demo Schema
const DemoSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },
      capacity: {
         type: String,
         default: null,
      },
      mobile: {
         type: String,
         trim: true,
         required: true,
      },
      location: {
         type: geoSchema,
         index: "2dsphere",
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Demo", DemoSchema);

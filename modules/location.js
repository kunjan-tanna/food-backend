const mongoose = require("mongoose");
const Banquet = require("./banquet");
const { ObjectId } = mongoose.Schema;

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
//Create Location Schema
const LocationSchema = new mongoose.Schema(
   {
      banquetId: {
         type: ObjectId,
         ref: Banquet,
         default: null,
      },

      location: {
         type: geoSchema,
         index: "2dsphere",
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("location", LocationSchema);

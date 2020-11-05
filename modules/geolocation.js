const mongoose = require("mongoose");
const Demo = require("./demo");
const { ObjectId } = mongoose.Schema;
//Create Geolocation Schema
const GeoSchema = new mongoose.Schema(
   {
      geometry: {
         type: {
            type: String,
            default: "Point",
         },
         coordinates: {
            type: [Number],
            index: "2dsphere",
         },
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Location", GeoSchema);

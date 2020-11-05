const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Demo = require("./demo");

//Create Demo Schema
const DemoSchema = new mongoose.Schema(
   {
      Data: {
         type: ObjectId,
         ref: Demo,
         default: null,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Fetch", DemoSchema);

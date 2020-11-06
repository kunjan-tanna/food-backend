const express = require("express");
const router = express.Router();
const multer = require("multer");

let storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "./public/upload");
   },
   filename: (req, file, cb) => {
      let filetype = "";
      if (file.mimetype === "image/gif") {
         filetype = "gif";
      }
      if (file.mimetype === "image/png") {
         filetype = "png";
      }
      if (file.mimetype === "image/jpeg") {
         filetype = "jpg";
      }
      cb(null, "image-" + Date.now() + "." + filetype);
   },
});

let upload = multer({ storage: storage });

const {
   createbanquet,
   getAllbanquet,
   getGeobanquet,
} = require("../controllers/banquet");

//Create banquet Route
router.post("/create/banquet", upload.single("avtar"), createbanquet);

//get all banquet Route
router.get("/banquet", getAllbanquet);

module.exports = router;

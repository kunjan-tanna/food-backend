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

const { createbundle, getAllbundle } = require("../controllers/bundle");

//Create bundle Route
router.post("/create/bundle", upload.single("image"), createbundle);

//get all bundle Route
router.get("/bundle", getAllbundle);

module.exports = router;

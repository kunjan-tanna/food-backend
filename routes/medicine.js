const express = require("express");
const { isAuthenticate, issignIn } = require("../controllers/auth");
const router = express.Router();

const {
   createMedicine,
   getMedicineById,
   getMedicine,
   getAllMedicine,
   updateMedicine,
   getupdateMedicine,
   deleteMedicine,
} = require("../controllers/medicine");

//Get Parameter of Medicine
router.param("medicineId", getMedicineById);

//Create Medicine Route
router.post("/create/medicine", createMedicine);

//Read Medicine Route
router.get("/get/medicine/:medicineId", getMedicine);
router.get("/medicine", getAllMedicine);

//Update Medicine Route
router.put("/edit/medicine/:medicineId", updateMedicine);

//Get all Update Medicine Route
router.get("/test/data", getupdateMedicine);

//Delete Medicine Route
router.delete("/delete/medicine/:medicineId", deleteMedicine);

router.get("/testroute", issignIn, (req, res) => {
   console.log("AUTH", req.auth);
   res.json(req.auth);
});
module.exports = router;

const express = require("express");
const router = express.Router();

const {
   createCompany,
   getCompany,
   getAllCompany,
   getCompanyById,
   updateCompany,
   deleteCompany,
} = require("../controllers/companies");

//Get Parameter of Company
router.param("companyId", getCompanyById);

//Create Company Route
router.post("/create/companies", createCompany);

//Read Company Route
router.get("/get/companies/:companyId", getCompany);
router.get("/companies", getAllCompany);

//Update Company Route
router.put("/edit/companies/:companyId", updateCompany);

//Delete Company Route
router.delete("/delete/companies/:companyId", deleteCompany);

module.exports = router;

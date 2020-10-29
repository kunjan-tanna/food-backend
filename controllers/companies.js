const Company = require("../models/companies");
const mongoose = require("mongoose");

// Get Id of Company in controller
exports.getCompanyById = (req, res, next, id) => {
   try {
      Company.findById(id).exec((err, company) => {
         if (err) {
            return res.status(400).json({
               error: "Company not found",
            });
         }
         req.company = company;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Store Company data in DB
exports.createCompany = (req, res) => {
   try {
      const company = new Company(req.body);
      company.save((err, company) => {
         if (err) {
            return res.status(400).json({
               error: "Company not found in DB",
            });
         }
         res.json({ company });
      });
   } catch (error) {
      console.log(error);
   }
};

//Get Company Data
exports.getCompany = (req, res) => {
   try {
      return res.json(req.company);
   } catch (error) {
      console.log(error);
   }
};

//Get All Company Data
exports.getAllCompany = (req, res) => {
   try {
      Company.find().exec((err, companies) => {
         if (err) {
            return res.status(400).json({
               error: "No companies found",
            });
         }
         res.json(companies);
      });
   } catch (error) {
      console.log(error);
   }
};

//Update Company Data
exports.updateCompany = async (req, res) => {
   try {
      let company = await Company.findOne({
         _id: mongoose.Types.ObjectId(req.body.companyId),
      });
      if (!company) {
         return res.send("Something Went wrong");
      } else {
         let editCompany = await Company.updateMany(
            { _id: req.body.companyId },
            {
               companyName: req.body.companyName,
            }
         );
         if (editCompany.nModified > 0) {
            let company = await Company.findOne({
               _id: mongoose.Types.ObjectId(req.body.companyId),
            });
            return res.json({ company });
         }
      }
   } catch (error) {
      console.log(error);
   }
};

//Delete Company Data
exports.deleteCompany = (req, res) => {
   try {
      let company = req.company;
      Company.deleteOne(company, (err, company) => {
         if (err) {
            return res.status(400).json({
               error: "No company found",
            });
         }
         res.send("Company details deleted successfully");
      });
   } catch (error) {
      console.log(error);
   }
};

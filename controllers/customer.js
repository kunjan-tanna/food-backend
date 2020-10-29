const Customer = require("../models/customer");

//Get Customer Id of Customer Controller
exports.getcustomerById = async (req, res, next, id) => {
   try {
      await Customer.findById(id).exec((err, customer) => {
         if (err) {
            return res.status(400).json({
               error: "customer Data Not Found",
            });
         }
         req.customer = customer;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Store customer Data In customer Collection
exports.createcustomer = async (req, res) => {
   try {
      const customer = await new Customer(req.body);
      customer.save((err, customer) => {
         if (err) {
            return res.status(400).json({
               error: "customer not able to save",
            });
         }
         return res.json(customer);
      });
   } catch (error) {
      console.log(error);
   }
};

//Get customer Data
exports.getcustomer = (req, res) => {
   try {
      return res.json(req.customer);
   } catch (error) {
      console.log(error);
   }
};

//Get All customer Data
exports.getAllcustomer = async (req, res) => {
   try {
      await Customer.find().exec((err, customer) => {
         if (err) {
            return res.status(400).json({
               error: "No customer Found",
            });
         }
         return res.json(customer);
      });
   } catch (error) {
      console.log(error);
   }
};

//Update customer Data
exports.updatecustomer = async (req, res) => {
   try {
      const editcustomer = await req.customer;
      editcustomer._id = req.body.customerId;
      editcustomer.customerName = req.body.customerName;
      editcustomer.save((err, customer) => {
         if (err) {
            return res.status(400).json({
               error: "customer data not updated",
            });
         }
         res.json({ customer });
      });
   } catch (error) {
      console.log(error);
   }
};

//Delete customer Data
exports.deletecustomer = async (req, res) => {
   try {
      const removecustomer = await req.customer;
      Customer.deleteOne(removecustomer, (err, customer) => {
         if (err) {
            return res.status(400).json({
               error: "No customer found",
            });
         }
         return res.send("customer details deleted successfully");
      });
   } catch (error) {
      console.log(error);
   }
};

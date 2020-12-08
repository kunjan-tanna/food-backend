const Product = require("../modules/product");

// Get Id of product in controller
exports.getProductById = (req, res, next, id) => {
   try {
      Product.findById(id).exec((err, product) => {
         if (err) {
            return res.status(400).json({
               error: "product data not found",
            });
         }
         req.product = product;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Create product api
exports.createProduct = async (req, res) => {
   try {
      const product = await new Product(req.body);
      product.save((err, product) => {
         if (err) {
            return res.status(400).json({
               error: "product not able to save",
            });
         }
         return res.json(product);
      });
   } catch (error) {
      console.log(error);
   }
};
//get product data
exports.getProduct = (req, res) => {
   try {
      return res.json(req.product);
   } catch (error) {
      console.log(error);
   }
};

//Get All product Data api
exports.getAllProduct = async (req, res) => {
   try {
      await Product.find().exec((err, product) => {
         if (err) {
            return res.status(400).json({
               error: "No product Found",
            });
         }
         return res.json(product);
      });
   } catch (error) {
      console.log(error);
   }
};
//Delete product Data
exports.deleteproduct = async (req, res) => {
   try {
      const removeproduct = await req.product;
      Product.deleteOne(removeproduct, (err, product) => {
         if (err) {
            return res.status(400).json({
               error: "No product Found",
            });
         } else {
            if (product.ok === 1) {
               Product.find().exec((err, product) => {
                  if (err) {
                     return res.status(400).json({
                        error: "No product Found",
                     });
                  }
                  return res.json(product);
               });
            }
         }
      });
   } catch (error) {
      console.log(error);
   }
};

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
//Update Increment Product
exports.updateIncProduct = async (req, res) => {
   try {
      Product.findByIdAndUpdate(req.body.productId).exec((err, product) => {
         if (err) {
            return res.status(422).json({
               error: "No Update Records",
            });
         }
         req.product = product;
         const quan = req.product.quantity + 1;
         const price = quan * req.body.price;
         const editProduct = req.product;
         editProduct._id = req.body.productId;
         editProduct.quantity = quan;
         editProduct.price = price;
         editProduct.save((err, m) => {
            // console.log("medicinwewewe", m);
            if (err) {
               return res.status(400).json({
                  error: "Medicine data not updated",
               });
            }
            return res.json(m);
         });
      });
   } catch (error) {
      console.log(error);
   }
};
//Update Decrement Product
exports.updateDecProduct = async (req, res) => {
   try {
      Product.findByIdAndUpdate(
         req.body.productId,
         {
            $inc: {
               quantity: -1,
            },
         },
         {
            new: true,
         }
      ).exec((err, result) => {
         if (err) {
            return res.status(422).json({
               error: "No Update Records",
            });
         }
         return res.json(result);
      });
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

const Product = require("../modules/product");

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

//Get All product Data api
exports.getAllProduct = async (req, res) => {
   try {
      await Product.find()
      .exec((err, product) => {
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

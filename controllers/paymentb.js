const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
   environment: braintree.Environment.Sandbox,
   merchantId: "ngyd4nv89r6zrzjw",
   publicKey: "bpcbssbk2pt9ww86",
   privateKey: "0c7fe14923b64b7958712fe979d5013a",
});

/*Get the Token*/
exports.getToken = (req, res) => {
   gateway.clientToken.generate({}, function (err, response) {
      if (err) {
         res.status(500).send(err);
      } else {
         res.send(response);
      }
   });
};

exports.processPayment = (req, res) => {
   let nonceFromTheClient = req.body.paymentMethodNonce;
   let amountFromTheClient = req.body.price;

   gateway.transaction.sale(
      {
         price: amountFromTheClient,
         paymentMethodNonce: nonceFromTheClient,
         options: {
            submitForSettlement: true,
         },
      },
      function (err, result) {
         if (err) {
            res.status(500).send(err);
         } else {
            res.send(result);
         }
      }
   );
};

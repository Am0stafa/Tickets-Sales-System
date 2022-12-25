const createPaymentIntent = async (req, res, next) => {
    const stripe = require("stripe")(
        "sk_test_51MItmuKwGmHCcom1WKlEEhKiyXIRXxGfn5TxYnfz5cdCzjMI7wVqSwJnyBJDMs4fqEbJFO8rhd10BV7vCX3ALnVX001sM8GugT"
      );
    
      const { amount, email, token } = req.body;
      
        //! create a customer
      stripe.customers
        .create({
          email: email,
          source: token.id,
          name: token.card.name,
        })
        .then((customer) => {
          return stripe.charges.create({
            amount: parseFloat(amount) * 100,
            description: `Payment for USD ${amount}`,
            currency: "USD",
            customer: customer.id,
          });
        })
        .then((charge) => res.status(200).json(charge))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
createPaymentIntent
};

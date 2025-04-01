const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = async (amount, token) => {
  return await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method: token,
    confirm: true,
  });
};

module.exports = processPayment;

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("Amount => ", amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      payment_method_types: ["card"],
    });

    console.log("Client Secret => ", paymentIntent.client_secret);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Payment Error => ", error);
    res.status(500).json({ message: "Payment Failed" });
  }
};

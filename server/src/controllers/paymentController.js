const Payment = require("../models/paymentModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//21 march
const nodemailer = require("nodemailer");

const createPaymentIntent = async (req, res) => {
  const { amount, currency, userId, eventId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: currency || "usd",
      metadata: {
        userId,
        eventId,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Payment creation failed" });
  }
};

//21 march
// Save payment details to database
// const savePayment = async (req, res) => {
//   try {
//     const { userId, eventId, amount, paymentStatus } = req.body;

//     const newPayment = new Payment({
//       user: userId,
//       event: eventId,
//       amount,
//       paymentStatus: paymentStatus || "completed",
//     });

//     await newPayment.save();
//     res.status(201).json({ message: "Payment saved successfully" });
//   } catch (error) {
//     console.error("Error saving payment:", error);
//     res.status(500).json({ error: "Failed to save payment" });
//   }
// };

// // Function to send email
// const sendConfirmationEmail = async (userId, amount) => {
//   try {
//       // Find user email (assuming you have a User model)
//       const user = await User.findById(userId);
//       if (!user) return console.error("User not found");

//       // Configure mail transporter
//       const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//               user: process.env.EMAIL_USER,
//               pass: process.env.EMAIL_PASS,
//           },
//       });

//       // Email details
//       const mailOptions = {
//           from: process.env.EMAIL_USER,
//           to: user.email,
//           subject: "Payment Confirmation",
//           text: `Dear ${user.name},\n\nYour payment of $${amount} was successful. Thank you for your purchase!\n\nBest Regards,\nEvent Management Team`,
//       };

//       await transporter.sendMail(mailOptions);
//       console.log("Confirmation email sent successfully!");
//   } catch (error) {
//       console.error("Error sending email:", error);
//   }
// };
const sendEmail = async (userEmail, amount) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Payment Confirmation",
    text: `Your payment of $${amount} was successful. Thank you!`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


// const savePayment = async (req, res) => {
//   try {
//     const { userId, eventId, amount, paymentStatus } = req.body;

//     if (!userId || !eventId || !amount || !paymentStatus) {
//       return res.status(400).json({ error: "Missing required fields" }); // Check for missing data
//     }

//     const newPayment = new Payment({
//       user: userId,
//       event: eventId,
//       amount,
//       paymentStatus,
//     });

//     await newPayment.save();

//     res.status(200).json({ message: "Payment saved successfully and email sent!" });
//   } catch (error) {
//     console.error("Error saving payment:", error);
//     res.status(500).json({ error: "Failed to save payment" });
//   }
// };

const savePayment = async (req, res) => {
  try {
    const { userId, eventId, amount, paymentStatus } = req.body;

    if (!userId || !eventId || !amount || !paymentStatus) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPayment = new Payment({
      user: userId,
      event: eventId,
      amount,
      paymentStatus,
    });

    await newPayment.save();
    res.status(200).json({ message: "Payment saved successfully and email sent!" });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ error: "Failed to save payment" });
  }
};



// module.exports = { savePayment };

module.exports = { createPaymentIntent ,savePayment};

const Razorpay = require("razorpay");

exports.createRazorpayInstance = () => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    return razorpay;
}


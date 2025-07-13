const { createRazorpayInstance } = require("../../config/razorpay");
const { errorResponse, successResponse } = require("../../utils/response");
const crypto = require("crypto");

const razorpayInstance = createRazorpayInstance();

async function createOrder(req, res) {
    // in real app do not take amount from req.body
    // take it from the product price or cart total 
    const { amount, prodId } = req.body;
    const options = {
        amount: amount * 100, // amount in rupees to be converted to paise
        currency: "INR",
        receipt: prodId,
    }
    try {
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return errorResponse(res, err.message);
            }
            return successResponse(res, "Order created successfully", order);
        })
    } catch (error) {
        return errorResponse(res, error.message);
    }
}
async function verifyPayment(req,res){
    const {order_id, signature, payment_id} = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(order_id + "|" + payment_id);
    const generatedSignature = hmac.digest("hex");
    if(generatedSignature === signature){
        // yur db operations can be added here ex. Order status change, cart to be emptied, etc.
        return successResponse(res, "Payment verified successfully");
    }
    return errorResponse(res, "Payment verification failed");
}
    
module.exports = { createOrder, verifyPayment };

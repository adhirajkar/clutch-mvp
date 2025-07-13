import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useApi } from "@/hooks/useApi";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { loadScript } from "@/utils/helper";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const RazorpayTest = () => {
  const [amount, setAmount] = useState("");
  const [razorpayKey, setRazorpayKey] = useState("");
  const {post, get} = useApi();

  const fetchKey = async () => {
    const res = await get(`/api/razorpay/getKey`)
    if(res.success){
        setRazorpayKey(res.data.key)
    }
  }

  useEffect(()=>{
    fetchKey();
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  },[])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    const options = {
        amount: parseInt(amount), // dont send amount from frontend in real case scenario
        prodId: uuidv4(), // cart id or prod id can be sent and amount can be automatically fetched from the backend, coupon id can be added to get the final amount
    }
    const res = await post(`/api/razorpay/createOrder`, {
        body: options
    })
   const paymentObj = new (window as any).Razorpay({
    name: "ClutchMVP",
    image: "https://media.istockphoto.com/id/1412715867/vector/electric-power-vector-icon.jpg?s=612x612&w=0&k=20&c=dkE2skX6iW8gBR4qussOzURGZMln7eSbakkXi0xJEgQ=",
    key: razorpayKey,
    order_id: res.data.id,
    ...res.data,
    handler: async function(response:any){
        console.log(response)
        const options2 = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature
        }
        await post(`/api/razorpay/verifyPayment`, {
            body: options2
        }).then((res:any)=>{
            console.log(res)
            if(res.success){
                // add api calls after payment success
                // e.g. update user subscription status, order status etc.
                toast.success(res.message)
            }else{
                toast.error(res.message)
            }
        })
    },
    error: function(response:any){
        console.log(response)
        toast.error(response.message)
    }
   })
   paymentObj.open()
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg space-y-4">
      <div className="mb-4 cursor-pointer hover:bg-gray-100 w-fit rounded-md py-2 pl-2 pr-4">
        <Link className="flex items-center" to="/"><ChevronLeft /><span className="font-semibold">Home</span></Link>
      </div>
      <h1 className="text-2xl font-bold text-center">Razorpay Test</h1>
      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount (in ₹)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1"
            min={1}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Pay Now
        </Button>
      </form>
    </div>
  );
};

export default RazorpayTest;

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Payment.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const BACKEND_URL = "https://arcade-array.onrender.com";

const CheckoutForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
  
    useEffect(() => {
      if (stripe && elements) {
        setIsReady(true);
      }
    }, [stripe, elements]);
  
    const handlePayment = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      if (!stripe || !elements) {
        toast.error("Stripe not initialized ⚠️");
        setLoading(false);
        return;
      }
  
      try {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
  
        if (result.error) {
          toast.error(result.error.message);
          setLoading(false);
          return;
        }
  
        if (result.paymentIntent.status === "succeeded") {
          toast.success("🎯 Payment Successful");
          setTimeout(() => {
            window.location.href = "/home1";
          }, 2000);
        }
      } catch (error) {
        toast.error("Payment Error ⚠️");
      }
      setLoading(false);
    };
  

    return (
        <form onSubmit={handlePayment}>
          <CardElement />
          <button disabled={loading || !isReady} type="submit">
            {loading ? <Loader /> : isReady ? "Pay Now" : "Loading Stripe..."}
          </button>
        </form>
      );
};

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const { data } = await axios.post(`${BACKEND_URL}/payment/create-payment-intent`, {
          amount: 10000, // Rs 100
        });
        setClientSecret(data.clientSecret);
      } catch (error) {
        toast.error("Failed to fetch Payment Intent");
      }
    };

    getClientSecret();
  }, []);

  return (
    <div className="payment">
      <h1>Arcade Array Payment Gateway 💰</h1>
      {clientSecret ? (
        stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }} key={clientSecret}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Payment;


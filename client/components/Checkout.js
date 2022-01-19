import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderThunk, fetchOrderIdAndProducts } from "../store/order";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const Checkout = () => {
  const { order, user, isLoggedIn, guest } = useSelector((state) => {
    return {
      order: state.order,
      user: state.auth,
      isLoggedIn: !!state.auth.id,
      guest: state.guestCheckout,
    };
  });

  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const [cartTotal, setCartTotal] = useState(0);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cost: 0,
  });

  useEffect(() => {
    if (guest) {
      dispatch(fetchOrderIdAndProducts(guest));
    } else {
      user.id &&
        !order.isComplete &&
        dispatch(fetchOrderIdAndProducts(user.id));
    }
  }, [user.id, isLoggedIn]);

  useEffect(() => {
    const cartTotal = order.products.reduce((total, product) => {
      const qty = order.quantity.find(
        (item) => item.productId === product.id
      )?.quantity;
      return (total += product.price * qty);
    }, 0);
    setCartTotal(cartTotal);
  }, [order.quantity]);

  useEffect(() => {
    setState((state) => ({
      ...state,
      cost: cartTotal / 100,
    }));
  }, [cartTotal]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:8080/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    dispatch(addOrderThunk(order.orderId, state));

    setIsLoading(false);
  };

  return (
    <div className="mt-4 leading-loose flex justify-center pb-20 pt-10">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-gray-800 text-center text-2xl font-bold">
          Checkout
        </h2>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="email">
            Email
          </label>
          <input
            onChange={handleChange}
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            value={state.email}
            required
            placeholder="Email"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600">Address</label>
          <input
            onChange={handleChange}
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="address"
            value={state.address}
            required
            placeholder="Street"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="city">
            City
          </label>
          <input
            onChange={handleChange}
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="city"
            value={state.city}
            required
            placeholder="City"
          />
        </div>
        <div className="inline-block mt-2 w-1/2 pr-1">
          <label className="block text-sm text-gray-600" htmlFor="state">
            State
          </label>
          <input
            onChange={handleChange}
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="state"
            value={state.state}
            required
            placeholder="State"
          />
        </div>
        <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
          <label className="block text-sm text-gray-600" htmlFor="zip">
            Zip
          </label>
          <input
            onChange={handleChange}
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="zip"
            value={state.zip}
            required
            placeholder="Zip"
          />
        </div>
        <p className="mt-4 text-gray-800 font-medium">Payment information</p>
        <PaymentElement className="mb-4" />
        <div className="mt-4">
          <p className="mt-4 text-gray-800 font-medium">
            Order total: ${(cartTotal / 100).toFixed(2)}
          </p>
          <button
            className="px-4 py-1 text-white font-light tracking-wider bg-red-400 rounded w-full"
            type="submit"
            disabled={isLoading || !stripe || !elements}
          >
            <span id="button-text">
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <div
                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-600"
                    role="status"
                  ></div>
                </div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {message && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2"
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Checkout;

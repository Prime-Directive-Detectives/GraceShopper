import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderThunk } from "../store/order";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  let history = useHistory();

  const { order } = useSelector((state) => {
    return { order: state.order };
  });

  const dispatch = useDispatch();

  const [cartTotal, setCartTotal] = useState(0);
  const [state, setState] = useState({
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cost: 0,
  });

  useEffect(() => {
    let cartTotal = order.products.reduce((total, product) => {
      const qty = order.quantity.find(
        (item) => item.productId === product.id
      )?.quantity;
      return (total += product.price * qty);
    }, 0);
    setCartTotal(cartTotal);
  }, [order.quantity]);

  useEffect(() => {
    setState((state) => ({ ...state, cost: cartTotal }));
  }, [cartTotal]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addOrderThunk(state));
    history.goBack();
  };

  return (
    <div className="leading-loose flex justify-center">
      <form
        className="max-w-xl m-4 p-10  rounded shadow-md"
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
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            name="email"
            value={state.email}
            required
            placeholder="Email"
          />
        </div>
        <div className="mt-2">
          <label className=" block text-sm text-gray-600" htmlFor="address">
            Address
          </label>
          <input
            onChange={handleChange}
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
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
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
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
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
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
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            name="zip"
            value={state.zip}
            required
            placeholder="Zip"
          />
        </div>
        <p className="mt-4 text-gray-800 font-medium">Payment information</p>
        <div>
          <label className="block text-sm text-gray-600" htmlFor="cardinfo">
            Card
          </label>
          <input
            onChange={handleChange}
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            name="cardinfo"
            placeholder="Card Number MM/YY CVC"
          />
        </div>
        <div className="mt-4">
          <p className="mt-4 text-gray-800 font-medium">
            Order total: ${(cartTotal / 100).toFixed(2)}
          </p>
          <button
            className="px-4 py-1 text-white font-light tracking-wider bg-red-400 rounded"
            type="submit"
          >
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

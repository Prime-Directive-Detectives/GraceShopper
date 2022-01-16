import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

const Checkout = () => {
  let history = useHistory();

  return (
    <div className="leading-loose flex justify-center">
      <form className="max-w-xl m-4 p-10 bg-white rounded shadow-md">
        <h2 className="text-gray-800 text-center text-2xl font-bold">
          Checkout
        </h2>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Email
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_email"
            name="cus_email"
            type="text"
            required=""
            placeholder="Email"
            aria-label="Email"
          />
        </div>
        <div className="mt-2">
          <label className=" block text-sm text-gray-600" htmlFor="cus_email">
            Address
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_email"
            name="cus_email"
            type="text"
            required=""
            placeholder="Street"
            aria-label="Email"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            City
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_email"
            name="cus_email"
            type="text"
            required=""
            placeholder="City"
            aria-label="Email"
          />
        </div>
        <div className="inline-block mt-2 w-1/2 pr-1">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            State
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_email"
            name="cus_email"
            type="text"
            required=""
            placeholder="State"
            aria-label="Email"
          />
        </div>
        <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Zip
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_email"
            name="cus_email"
            type="text"
            required=""
            placeholder="Zip"
            aria-label="Email"
          />
        </div>
        <p className="mt-4 text-gray-800 font-medium">Payment information</p>
        <div>
          <label className="block text-sm text-gray-600" htmlFor="cus_name">
            Card
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_name"
            name="cus_name"
            type="text"
            required=""
            placeholder="Card Number MM/YY CVC"
            aria-label="Name"
          />
        </div>
        <div className="mt-4">
          <button
            className="px-4 py-1 text-white font-light tracking-wider bg-red-400 rounded"
            type="submit"
          >
            $3.00
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

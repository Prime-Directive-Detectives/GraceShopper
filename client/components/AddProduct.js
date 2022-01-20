import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductThunk } from "../store/products";
import { useHistory } from "react-router-dom";

const AddProduct = () => {
  let history = useHistory();

  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    price: "",
    type: "",
    gender: "",
    imageUrl: undefined,
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addProductThunk(state));
    history.go(-1);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="flex justify-center text-center text-2xl font-extrabold py-2 mb-4 text-red-600">
            Add Product
          </h2>
          <div className="mb-4">
            <label htmlFor="name"></label>
            <input
              onChange={handleChange}
              name="name"
              value={state.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price"></label>
            <input
              onChange={handleChange}
              name="price"
              value={state.price}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Price"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type"></label>
            <input
              onChange={handleChange}
              name="type"
              value={state.type}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Type"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender"></label>
            <input
              onChange={handleChange}
              name="gender"
              value={state.gender}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Gender"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image"></label>
            <input
              onChange={handleChange}
              name="imageUrl"
              value={state.imageUrl}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Image"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description"></label>
            <input
              onChange={handleChange}
              name="description"
              value={state.description}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Description"
              required
            />
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

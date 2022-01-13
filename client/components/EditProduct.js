import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductThunk } from "../store/products";
import { useHistory } from "react-router-dom";

const EditProduct = () => {
  let history = useHistory();

  const { allProducts } = useSelector((state) => {
    console.log(state);
    return {
      allProducts: state.products.allProducts,
    };
  });

  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    price: 0,
    type: "",
    gender: "",
    image: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editProductThunk(allProducts.id, state));
    history.push("/allProducts");
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-red-600">
          Edit Product
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name"></label>
              <input
                onChange={handleChange}
                name="name"
                value={allProducts.name}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="price"></label>
              <input
                onChange={handleChange}
                name="price"
                value={allProducts.price}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Price"
              />
            </div>
            <div>
              <label htmlFor="type"></label>
              <input
                onChange={handleChange}
                name="type"
                value={allProducts.type}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Type"
              />
            </div>
            <div>
              <label htmlFor="gender"></label>
              <input
                onChange={handleChange}
                name="gender"
                value={allProducts.gender}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Gender"
              />
            </div>
            <div>
              <label htmlFor="image"></label>
              <input
                onChange={handleChange}
                name="image"
                value={allProducts.image}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Image"
              />
            </div>
            <div>
              <label htmlFor="description"></label>
              <input
                onChange={handleChange}
                name="description"
                value={allProducts.description}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Description"
              />
            </div>

            <div>
              <button
                className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

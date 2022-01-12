import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../store";
import { LockClosedIcon } from "@heroicons/react/solid";

const AddProduct = ({ formName }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      authenticate(name, price, type, gender, image, description, formName)
    );
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          name={formName}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name">
                <small>Name</small>
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="price">
                <small>Price</small>
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                name="price"
                type="price"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="price">
                <small>Type</small>
              </label>
              <input
                onChange={(e) => setType(e.target.value)}
                name="type"
                type="type"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="gender">
                <small>Gender</small>
              </label>
              <input
                onChange={(e) => setGender(e.target.value)}
                name="gender"
                type="gender"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="image">
                <small>Image</small>
              </label>
              <input
                onChange={(e) => setImage(e.target.value)}
                name="image"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="description">
                <small>Description</small>
              </label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                type="description"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

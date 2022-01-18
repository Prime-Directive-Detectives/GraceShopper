import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct } from "../store/singleProduct";
import { getAllProducts } from "../store/products";
import { useParams } from "react-router-dom";

const loadedProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);

  const [loadedProduct, setLoadedProduct] = useState({});

  const { singleProduct } = useSelector((state) => {
    return { singleProduct: state.singleProduct.singleProduct };
  });

  const { allProducts } = useSelector((state) => {
    return { allProducts: state.products.allProducts };
  });

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    setLoadedProduct(singleProduct);
  }, [singleProduct]);

  let similarProducts = allProducts.filter(
    (product) => product.type === loadedProduct.type
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const someSimilarProducts = similarProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="container mx-auto px-6">
      {!loadedProduct ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div className="my-8">
          <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
              <img
                className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
                src={loadedProduct.imageUrl}
              />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2  content-center items-center">
              <h3 className="text-gray-700 uppercase text-lg">
                {loadedProduct.name}
              </h3>
              <span className="text-gray-500 mt-3">
                ${(loadedProduct.price / 100).toFixed(2)}
              </span>
              <br />
              <hr className="my-3"></hr>
              <div className="mt-2">
                <label className="text-gray-700 text-sm">Count:</label>
                <div className="flex items-center mt-1">
                  <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>

                  <span className="text-gray-700 text-lg mx-2">1</span>
                  <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <br />
              <h6 className="text-gray-700  ">{loadedProduct.description}</h6>
              <div className="flex items-center mt-6 space-x-3">
                <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                  Add to Cart
                </button>
                <button className="px-8 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-400 focus:outline-none focus:bg-red-400">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-gray-600 text-2xl font-medium text-center mt-3">
              Similar Products
            </h3>
            {!someSimilarProducts.length === 0 ? (
              <div>Loading...</div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
                {someSimilarProducts.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className=" max-w-sm mx-auto rounded-md shadow-md overflow-hidden flex-col w-80 h-80 justify-evenly"
                    >
                      <div
                        className="h-64"
                        onClick={() => {
                          setLoadedProduct(product);
                        }}
                      >
                        <div className="mx-auto">
                          <img
                            className="flex items-end  w-full object-cover h-48 object-center"
                            src={product.imageUrl}
                          />
                        </div>
                        <h3 className="text-gray-700 uppercase mt-3">
                          {product.name}
                        </h3>
                        <span className="text-gray-500 mt-2">
                          ${(product.price / 100).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <button className="p-2 rounded-full bg-indigo-600 text-white  hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 mr-4 mb-4 relative">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default loadedProduct;

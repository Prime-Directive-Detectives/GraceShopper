import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, deleteProductThunk } from "../store/products";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { allProducts } = useSelector((state) => {
    return { allProducts: state.products.allProducts };
  });

  // Bring in actions from store
  const dispatch = useDispatch();

  //dispatch from getProducts Thunk
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const onClickDelete = (id) => {
    dispatch(deleteProductThunk(id));
  };

  return (
    <div>
      {allProducts.length === 0 ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div className="mx-auto container grid grid-cols-3 gap-2 ">
          {allProducts.map((product) => {
            return (
              <div className="w-full rounded border-2" key={Number(product.id)}>
                <img className="w-35 h-35" src={product.imageUrl} />
                <b>{product.name}</b>
                <br />
                <b className="text-right">
                  {product.gender + " " + product.type}
                </b>
                <br />
                <b>Price: $</b> {product.price}
                <br />
                <b>Description: </b>
                {product.description}
                <Link to="/editProduct">
                  <button
                    className="group relative w-30  flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    type="button"
                  >
                    Edit Product
                  </button>
                </Link>
                <button
                  className="group relative w-30 flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => onClickDelete(product.id)}
                  type="button"
                >
                  Delete Product
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllProducts;

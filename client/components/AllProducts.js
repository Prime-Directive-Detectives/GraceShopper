import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/products";
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

  return (
    <div>
      {allProducts.length === 0 ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div className="mx-auto container grid grid-cols-3 gap-2 ">
          {allProducts.map((product) => {
            return (
              <Link key={product.id} to={`/allProducts/${product.id}`}>
                <div className="w-full rounded border-2">
                  <img className="w-35 h-35" src={product.imageUrl} />
                  <b>{product.name}</b>
                  <br />
                  <b className="text-right">
                    {product.gender + " " + product.type.toLowerCase()}
                  </b>
                  <br />
                  <b>Price: $</b> {product.price}
                  <br />
                  <b>Description: </b>
                  {product.description}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllProducts;

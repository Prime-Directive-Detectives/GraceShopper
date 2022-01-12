import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products";

const Products = () => {
  const { products } = useSelector((state) => {
    return { products: state.products.products };
  });

  // Bring in actions from store
  const dispatch = useDispatch();

  //dispatch from getProducts Thunk
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      {products.length === 0 ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div>
          {products.map((product) => {
            return (
              <ul key={Number(product.id)}>
                <img src={product.imageUrl} />
                <li>Name: </li> {product.name}
                <li>Price: $</li> {product.price}
                <li>Description: </li>
                {product.description}
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;

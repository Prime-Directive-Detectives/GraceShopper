import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMaleProducts } from "../store/products";

const MaleProducts = () => {
  const { maleProducts } = useSelector((state) => {
    return { maleProducts: state.maleProducts };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMaleProducts());
  }, []);

  console.log("maleProducts", maleProducts);

  return (
    <div>
      {/* {maleProducts.length === 0 ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div>
          {maleProducts.map((product) => {
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
      )} */}
    </div>
  );
};

export default MaleProducts;

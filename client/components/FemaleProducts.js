import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFemaleProducts } from "../store/products";
import { Link } from "react-router-dom";
const FemaleProducts = () => {
  const { femaleProducts } = useSelector((state) => {
    return { femaleProducts: state.products.femaleProducts };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFemaleProducts());
  }, []);

  return (
    <div>
      {femaleProducts.length === 0 ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div className="mx-auto container grid grid-cols-3 gap-2 ">
          {femaleProducts.map((product) => {
            return (
              <Link key={product.id} to={`/allProducts/${product.id}`}>
                <div className="w-full rounded border-2">
                  <img className="w-35 h-35" src={product.imageUrl} />
                  <b>{product.name}</b>
                  <br />
                  <b>Price: $</b> {(product.price / 100).toFixed(2)}
                  <br />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FemaleProducts;

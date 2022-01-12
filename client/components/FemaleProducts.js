import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFemaleProducts } from "../store/products";

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
              <div className="w-full rounded border-2" key={Number(product.id)}>
                <img className="w-35 h-35" src={product.imageUrl} />
                <b>{product.name}</b>
                <br />
                <b>Price: $</b> {product.price}
                <br />
                <b>Description: </b>
                {product.description}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FemaleProducts;

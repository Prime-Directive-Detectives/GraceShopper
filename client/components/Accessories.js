import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccessories } from "../store/products";

const Accessories = () => {
  const { accessories } = useSelector((state) => {
    return { accessories: state.products.accessories };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccessories());
  }, []);

  return (
    <div>
      {accessories.length === 0 ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div className="mx-auto container grid grid-cols-3 gap-2 ">
          {accessories.map((product) => {
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

export default Accessories;

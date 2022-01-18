import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMaleProducts } from "../store/products";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const MaleProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  const { maleProducts } = useSelector((state) => {
    return { maleProducts: state.products.maleProducts };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMaleProducts());
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const someMaleProducts = maleProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  // paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateBack = () => {
    if (currentPage === 1) setCurrentPage(currentPage);
    else {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginateFront = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      <div className="text-center mt-2">
        <Pagination
          paginateFront={paginateFront}
          paginateBack={paginateBack}
          paginate={paginate}
          productsPerPage={productsPerPage}
          totalProducts={maleProducts.length}
        />
      </div>
      {someMaleProducts.length === 0 ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div className="mx-auto container grid grid-cols-3 gap-2 ">
          {someMaleProducts.map((product) => {
            return (
              <Link key={product.id} to={`/allProducts/${product.id}`}>
                <div className="w-full rounded border-2">
                  <img className="w-35 h-35" src={product.imageUrl} />
                  <div className="flex place-self-end justify-between mt-2  mb-2">
                    <div className="text-gray-700 uppercase text-md">
                      {product.name}
                    </div>

                    <div className="text-right content-center text-gray-700 uppercase text-md">
                      $ {(product.price / 100).toFixed(2)}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MaleProducts;

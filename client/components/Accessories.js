import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccessories } from "../store/products";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const Accessories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const { accessories } = useSelector((state) => {
    return { accessories: state.products.accessories };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccessories());
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const someAccessories = accessories.slice(
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
    if (currentPage < 2) {
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
          totalProducts={accessories.length}
        />
      </div>
      {someAccessories.length === 0 ? (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-52 w-52 border-t-8 border-b-8 border-indigo-300"></div>
        </div>
      ) : (
        <div className="mx-auto container grid grid-cols-3 gap-2 ">
          {someAccessories.map((product) => {
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

export default Accessories;

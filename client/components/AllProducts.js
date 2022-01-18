import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/products";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  const { allProducts } = useSelector((state) => {
    return { allProducts: state.products.allProducts };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const someProducts = allProducts.slice(
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
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div>
        <div className="text-center mt-2">
          <Pagination
            paginateFront={paginateFront}
            paginateBack={paginateBack}
            paginate={paginate}
            productsPerPage={productsPerPage}
            totalProducts={allProducts.length}
          />
        </div>

        {someProducts.length === 0 ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-52 w-52 border-t-8 border-b-8 border-indigo-300"></div>
          </div>
        ) : (
          <div className="mx-auto container grid grid-cols-3 gap-2 mt-2 object-fill">
            {someProducts.map((product) => {
              return (
                <Link key={product.id} to={`/allProducts/${product.id}`}>
                  <div className=" rounded border-2 h-full object-center">
                    <img className="max-w-full " src={product.imageUrl} />
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
    </>
  );
};

export default AllProducts;
